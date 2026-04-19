param(
  [string]$PrimaryContainer = "lms-mysql-primary",
  [string]$ReplicaContainer = "lms-mysql-replica"
)

Write-Output "=== PRIMARY STATUS ==="
docker exec -i $PrimaryContainer mysql -uroot -proot -e "SHOW MASTER STATUS\G"

Write-Output "=== REPLICA STATUS ==="
docker exec -i $ReplicaContainer mysql -uroot -proot -e "SHOW REPLICA STATUS\G"
