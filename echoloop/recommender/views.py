import os
import requests
import base64
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

def home(request):
    return render(request, 'home.html')

def signup_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return redirect('home')
    return render(request, 'signup.html')

def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'login.html', {'error': 'Invalid username or password'})
    return render(request, 'login.html')

def logout_user(request):
    logout(request)
    return redirect('home')

def profile_view(request):
    return render(request, 'profile.html')

def favorites_view(request):
    return render(request, 'favorites.html')

def spotify_login(request):
    client_id = os.getenv('SPOTIFY_CLIENT_ID')
    redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')
    scope = 'user-top-read'
    auth_url = (
        f"https://accounts.spotify.com/authorize?"
        f"client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&scope={scope}"
    )
    return redirect(auth_url)

def spotify_callback(request):
    code = request.GET.get('code')
    if not code:
        return redirect('home')

    client_id = os.getenv('SPOTIFY_CLIENT_ID')
    client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
    redirect_uri = os.getenv('SPOTIFY_REDIRECT_URI')

    token_url = 'https://accounts.spotify.com/api/token'
    auth_header = base64.b64encode(f'{client_id}:{client_secret}'.encode()).decode('ascii')

    response = requests.post(token_url, data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri,
    }, headers={
        'Authorization': f'Basic {auth_header}',
        'Content-Type': 'application/x-www-form-urlencoded'
    })

    if response.status_code == 200:
        tokens = response.json()
        access_token = tokens['access_token']
        request.session['access_token'] = access_token
        return redirect('top_artists')
    else:
        print(response.text)
        return redirect('home')

def top_artists_view(request):
    access_token = request.session.get('access_token')

    if not access_token:
        return render(request, 'top_artists.html', {'artists': []})

    response = requests.get(
        'https://api.spotify.com/v1/me/top/artists',
        headers={'Authorization': f'Bearer {access_token}'}
    )

    if response.status_code == 200:
        artists_data = response.json()['items'][:8]  # << ONLY FIRST 8 ARTISTS
        artists = []

        for artist in artists_data:
            name = artist['name']
            genres = ', '.join(artist['genres']) if artist['genres'] else 'No genres available'
            image_url = artist['images'][0]['url'] if artist['images'] else None
            artists.append({'name': name, 'genres': genres, 'image_url': image_url})

        return render(request, 'top_artists.html', {'artists': artists})
    else:
        print(response.text)
        return render(request, 'top_artists.html', {'artists': []})

