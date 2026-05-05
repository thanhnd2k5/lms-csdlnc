# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
# at 157
#260505 17:54:17 server id 1  end_log_pos 0 CRC32 0x485f4a9e 	Start: binlog v 4, server v 8.0.46 created 260505 17:54:17
BINLOG '
Wcz5aQ8BAAAAegAAAAAAAAAAAAQAOC4wLjQ2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAEwANAAgAAAAABAAEAAAAYgAEGggAAAAICAgCAAAACgoKKioAEjQA
CigAAZ5KX0g=
'/*!*/;
# at 157
#260505 18:00:11 server id 1  end_log_pos 236 CRC32 0x5f9480a5 	Anonymous_GTID	last_committed=0	sequence_number=1	rbr_only=yes	original_committed_timestamp=1777978811953206	immediate_commit_timestamp=1777978811953206	transaction_length=482
/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;
# original_commit_timestamp=1777978811953206 (2026-05-05 18:00:11.953206 SE Asia Standard Time)
# immediate_commit_timestamp=1777978811953206 (2026-05-05 18:00:11.953206 SE Asia Standard Time)
/*!80001 SET @@session.original_commit_timestamp=1777978811953206*//*!*/;
/*!80014 SET @@session.original_server_version=80046*//*!*/;
/*!80014 SET @@session.immediate_server_version=80046*//*!*/;
SET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;
# at 236
#260505 18:00:11 server id 1  end_log_pos 321 CRC32 0x2e06948e 	Query	thread_id=22	exec_time=0	error_code=0
SET TIMESTAMP=1777978811/*!*/;
SET @@session.pseudo_thread_id=22/*!*/;
SET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;
SET @@session.sql_mode=1168113696/*!*/;
SET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;
/*!\C cp850 *//*!*/;
SET @@session.character_set_client=4,@@session.collation_connection=4,@@session.collation_server=255/*!*/;
SET @@session.lc_time_names=0/*!*/;
SET @@session.collation_database=DEFAULT/*!*/;
/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;
BEGIN
/*!*/;
# at 321
#260505 18:00:11 server id 1  end_log_pos 403 CRC32 0x2a7dbb44 	Table_map: `lms_restore`.`users` mapped to number 85
# has_generated_invisible_primary_key=0
# at 403
#260505 18:00:11 server id 1  end_log_pos 608 CRC32 0xe15c2be0 	Update_rows: table id 85 flags: STMT_END_F

BINLOG '
u835aRMBAAAAWgAAAJMBAAAAAFUAAAAAAAMAC2xtc19yZXN0b3JlAAV1c2VycwAMAw8PDw/+AQ8P
/BEREcgAkAH8A5AB9wH8A/wDAgAA8A8BAQACAS1Eu30q
u835aR8BAAAAzQAAAGACAAAAAFUAAAAAAAEAAgAM/////4ADAQAAAAV1c2VyMQwAdXNlcjFAbG1z
LnZuIAAxYTFkYzkxYzkwNzMyNWM2OTI3MWRkZjBjOTQ0YmM3MgkAVHJhbiBVeWVuAwFjsh6Aafjk
CYADAQAAAAV1c2VyMQwAdXNlcjFAbG1zLnZuIAAxYTFkYzkxYzkwNzMyNWM2OTI3MWRkZjBjOTQ0
YmM3Mg4AVHJhbiBVeWVuIFBJVFIDAWOyHoBp+c274Ctc4Q==
'/*!*/;
# at 608
#260505 18:00:11 server id 1  end_log_pos 639 CRC32 0x8c606ee6 	Xid = 1344
COMMIT/*!*/;
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
