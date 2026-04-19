param(
  [string]$ReplicaContainer = "lms-mysql-replica",
  [string]$PrimaryHost = "mysql-primary",
  [string]$ReplicationUser = "repl",
  [string]$ReplicationPassword = "replpass"
)

$sql = @"
STOP REPLICA;
RESET REPLICA ALL;
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='$PrimaryHost',
  SOURCE_PORT=3306,
  SOURCE_USER='$ReplicationUser',
  SOURCE_PASSWORD='$ReplicationPassword',
  SOURCE_AUTO_POSITION=1,
  GET_SOURCE_PUBLIC_KEY=1;
START REPLICA;
SHOW REPLICA STATUS\G
"@

docker exec -i $ReplicaContainer mysql -uroot -proot -e $sql
