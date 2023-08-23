from rest_framework import serializers
from .models import User

class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "username", "password"]
        # hiding password : not returning on postman
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)

        # a user is created only if it doesn't already exist with the same username
        user_instance = self.Meta.model(**validated_data)
        if password is not None:
            # set_password hashes the pswrd
            user_instance.set_password(password)
            user_instance.save()
            return user_instance
