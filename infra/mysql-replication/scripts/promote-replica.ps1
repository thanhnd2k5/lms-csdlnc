param(
  [string]$ReplicaContainer = "lms-mysql-replica"
)

$sql = @"
STOP REPLICA;
RESET REPLICA ALL;
SET GLOBAL read_only = OFF;
SET GLOBAL super_read_only = OFF;
"@

docker exec -i $ReplicaContainer mysql -uroot -proot -e $sql
