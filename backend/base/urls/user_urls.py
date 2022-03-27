from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('profile/', views.getUserProfile, name="users-profile"),
    path('', views.getUsers, name="register"),
    path('register/', views.registerUser, name="users"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/update/', views.updateUserProfile, name="users-profile-update"),
]