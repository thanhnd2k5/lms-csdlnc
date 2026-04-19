param(
  [string]$ComposeFile = "docker-compose.yml"
)

docker compose -f $ComposeFile down -v
docker compose -f $ComposeFile up -d
