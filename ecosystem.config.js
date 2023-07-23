module.exports = {
    apps : [{
        name: "proyecto-backend",
        script: "./src/app.js",
        error_file: "./logs/err.log",
        watch: false,
        instances: 2,
        ignore_watch: './dist/src/logs/*',
        instance_var: "0"
    }]
}