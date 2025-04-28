from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup_user, name='signup'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('profile/', views.profile_view, name='profile'),
    path('favorites/', views.favorites_view, name='favorites'),
    path('spotify-login/', views.spotify_login, name='spotify_login'),
    path('callback/', views.spotify_callback, name='spotify_callback'),
    path('top-artists/', views.top_artists_view, name='top_artists'),
]
