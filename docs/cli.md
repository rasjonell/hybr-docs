---
sidebar_position: 2
---

# Hybr CLI

The Hybr CLI `hybr` lets you manage Hybr services installed either on your local machine or on a remote host in your private network.

## Installation

If you used the quickstart script to install hybr on your machine(either local or a vps)

```bash
curl -sSL https://hybr.dev/install.sh | bash
```

Then that machine should have `hybr` CLI installed already.

You can also install it with Go if you are on a non-hybr machine(more on remote access bellow.)

```bash
go install github.com/rasjonell/hybr/cmd/hybr@latest
```

## CLI Commands and Options

Considering Hybr was initialized on your machine you can run any of the commands bellow

- List all installed services and their status:
```bash
hybr services
```

```bash
[nextcloud]  ✅ running
[tt-rss]     ✅ running

Usage:
  hybr services [flags]
  hybr services [command]

Available Commands:
  components  Show service components
  info        Show service information
  logs        Service logs
  start       Start the service
  stop        Stop the service

Flags:
  -h, --help             help for services
  -s, --service string   Name of the service

Use "hybr services [command] --help" for more information about a command.
```

- Show single service information

```bash
hybr services -s nextcloud info
```

```bash
[Name]             nextcloud
[Status]           ✅ running
[Global URL]       https://{HOST}.{MAGIC_DNS}/
[Local URL]        localhost:8281
[Install Date]     Monday, 10-Mar-25 17:02:59 UTC
[Last Start Date]  Monday, 10-Mar-25 17:02:59 UTC
```


- Show service components

```bash
hybr services -s nextcloud components
```

```bash
-----------------------------
Name   Version  Status     
-----------------------------
db     10.11    ✅ running   
redis  alpine   ✅ running   
app    latest   ✅ running   
```

- Read service logs

```bash
hybr services -s nextcloud logs
```

```bash
[nextcloud] app-1    | 172.19.0.1 - - [12/Mar/2025:13:25:23 +0000] "GET /index.php/apps/files/preview-service-worker.js HTTP/1.1" 200 2767 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0"
[nextcloud] app-1    | 172.19.0.1 - - [12/Mar/2025:13:25:24 +0000] "GET /index.php/apps/files/preview-service-worker.js HTTP/1.1" 200 2765 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0"
[nextcloud] app-1    | 172.19.0.1 - - [12/Mar/2025:13:25:25 +0000] "GET /index.php/apps/files/preview-service-worker.js HTTP/1.1" 200 2771 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0"
```

- Start/Stop services

```bash
hybr services -s nextcloud stop
```

```bash
[docker]  Container nextcloud-app-1  Stopping
[docker]  Container nextcloud-app-1  Stopped
[docker]  Container nextcloud-app-1  Removing
[docker]  Container nextcloud-app-1  Removed
[docker]  Container nextcloud-db-1  Stopping
[docker]  Container nextcloud-redis-1  Stopping
[docker]  Container nextcloud-redis-1  Stopped
[docker]  Container nextcloud-redis-1  Removing
[docker]  Container nextcloud-redis-1  Removed
[docker]  Container nextcloud-db-1  Stopped
[docker]  Container nextcloud-db-1  Removing
[docker]  Container nextcloud-db-1  Removed
[docker]  Volume nextcloud_db  Removing
[docker]  Volume nextcloud_nextcloud  Removing
[docker]  Network nextcloud_default  Removing
[docker]  Volume nextcloud_db  Removed
[docker]  Network nextcloud_default  Removed
[docker]  Volume nextcloud_nextcloud  Removed
```

Now if we check the service status we can see that it's stopped.

```bash
hybr services -s nextcloud

nextcloud  🛑 stopped
```

To start a service you can run:

```bash
hybr services -s nextcloud start
```

```bash
[docker]  Network nextcloud_default  Creating
[docker]  Network nextcloud_default  Created
[docker]  Volume "nextcloud_nextcloud"  Creating
[docker]  Volume "nextcloud_nextcloud"  Created
[docker]  Volume "nextcloud_db"  Creating
[docker]  Volume "nextcloud_db"  Created
[docker]  Container nextcloud-redis-1  Creating
[docker]  Container nextcloud-db-1  Creating
[docker]  Container nextcloud-redis-1  Created
[docker]  Container nextcloud-db-1  Created
[docker]  Container nextcloud-app-1  Creating
[docker]  Container nextcloud-app-1  Created
[docker]  Container nextcloud-redis-1  Starting
[docker]  Container nextcloud-db-1  Starting
[docker]  Container nextcloud-redis-1  Started
[docker]  Container nextcloud-db-1  Started
[docker]  Container nextcloud-app-1  Starting
[docker]  Container nextcloud-app-1  Started
```

Now if we check the service status we can see that it's running.

```bash
hybr services -s nextcloud

nextcloud  ✅ running
```

## Using Hybr on a remote machine

Hybr CLI also gives you the ability to run hybr commands on remote hosts that are in your tailscale network.

### Installing Hybr CLI on a non-hybr machine

You can install `hybr` cli on any machine on your tailscale network, regardless of having any self-hosted services on that machine or not.

To install run:

```bash
go install github.com/rasjonell/hybr/cmd/hybr@latest
```

### Running Hybr commands on a remote machine

Now let's assume we have a host called `vps` in our tailnet and `vps` has hybr initialized([see quickstart guide](/docs/intro)).

We can use the `-r` or `--remote-host` flag on the `hybr services` to run `hybr` CLI commands on the remote host.

```bash
hybr services -r vps info -s nextcloud
```

```bash
Running [hybr services info -s nextcloud] on vps...

[vps] [Name]             nextcloud
[vps] [Status]           ✅ running
[vps] [Global URL]       https://vps.magic_dns.ts.net/
[vps] [Local URL]        localhost:8281
[vps] [Install Date]     Monday, 10-Mar-25 17:02:59 UTC
[vps] [Last Start Date]  Monday, 10-Mar-25 17:02:59 UTC
```
