FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Étape de build pour installer Node.js et construire l'application Angular si nécessaire
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Installation de Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src

# Copie et restauration des dépendances .NET (optimisation pour le cache des layers)
COPY ["The_Mind/The_Mind.csproj", "The_Mind/"]
RUN dotnet restore "The_Mind/The_Mind.csproj"

# Copie du reste des fichiers du projet
COPY . .

# Build de l'application Angular, ajustez le chemin selon votre structure de projet
WORKDIR "/src/The_Mind/ClientApp"
RUN npm install
RUN npm run build -- --configuration=production

# Retour au dossier du projet .NET pour le build et la publication
WORKDIR "/src/The_Mind"
RUN dotnet build "The_Mind.csproj" -c Release -o /app/build
FROM build AS publish
RUN dotnet publish "The_Mind.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Étape finale pour exécuter l'application
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Assurez-vous de copier le build Angular dans le dossier wwwroot
#COPY --from=build "/src/The_Mind/ClientApp/dist" "./wwwroot"

ENTRYPOINT ["dotnet", "The_Mind.dll"]
