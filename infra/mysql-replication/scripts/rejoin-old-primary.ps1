param(
  [string]$OldPrimaryContainer = "lms-mysql-primary",
  [string]$NewPrimaryHost = "mysql-replica",
  [int]$NewPrimaryPort = 3306,
  [string]$ReplicationUser = "repl",
  [string]$ReplicationPassword = "replpass"
)

$sql = @"
STOP REPLICA;
RESET REPLICA ALL;
SET GLOBAL read_only = OFF;
SET GLOBAL super_read_only = OFF;
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='$NewPrimaryHost',
  SOURCE_PORT=$NewPrimaryPort,
  SOURCE_USER='$ReplicationUser',
  SOURCE_PASSWORD='$ReplicationPassword',
  SOURCE_AUTO_POSITION=1,
  GET_SOURCE_PUBLIC_KEY=1;
START REPLICA;
SET GLOBAL read_only = ON;
SET GLOBAL super_read_only = ON;
SHOW REPLICA STATUS\G
"@

docker exec -i $OldPrimaryContainer mysql -uroot -proot -e $sql
