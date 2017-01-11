module.exports = {
  parseDatabaseTarget: function (target) {
    // If an environment variable exists with the name passed in,
    // then it will be used as the database target
    if (process.env.hasOwnProperty(environmentVariable)) {
      target = process.env[environmentVariable];
    }

    //TODO: handle invaild entry

    var db = {
      host: 'localhost',
      port: 3306,
      user: null,
      password: null,
      database: 'database'
    };

    var check = target;
    // check: [user:pass@]<hostname>[:port][/db]

    // Check the last part for a db name
    var matches = check.match(/\/(.+)$/);
    if (matches) {
      db.database = matches[1];
      check = check.slice(0, check.length - matches[0].length);
    }

    // check: [user:pass@]<hostname>[:port]

    // Check the first part for the user & pass
    var atPosition = check.indexOf('@');
    if (atPosition > 0) {
      var userPass = check.substring(0, atPosition).split(':');
      db.user = userPass[0];
      db.password = userPass[1] || null;
      check = check.slice(atPosition + 1);
    }

    // check: <hostname>[:port]

    // Split the rest for hostname and port
    var parts = check.split(':');
    db.host = parts[0];

    if (parts.length > 1) {
      var port = Number(parts[1]);
      if (!isNaN(port)) {
        db.port = port;
      }
    }

    return db;
  }
};
