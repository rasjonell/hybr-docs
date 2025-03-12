---
sidebar_position: 1
---

#  Intro

Let's discover **Hybr in less than 5 minutes**.

## What is Hybr?

Hybr is a self-hosted infrastructure manager designed to simplify the deployment and management of your personal digital services.
Inspired by the principles of self-reliance and digital independence,
Hybr provides an opinionated framework for running services securely and efficiently within your own private network.

:::note

I've tested Hybr on local machines and cloud-based VPS environments.

If you come across any issues, **please** let me know in [GitHub Issues](https://github.com/rasjonell/hybr/issues)
:::

## Getting Started

This guide will walk you through installing Hybr on your system and setting up your first self-hosted service.

### Prerequisites

*   A Linux-based operating system (tested on Arch, but *should* work on Ubuntu, Debian, and its derivatives)
*   `sudo` privileges (required for service installation)

### Installation

The easiest way to install Hybr is by using the installation script:

**Using curl:**

```bash
curl -sSL https://hybr.dev/install.sh | bash
```

**Using wget:**

```bash
wget -qO- https://hybr.dev/install.sh | bash
```

This script automates the process of downloading and installing Hybr and its dependencies.

**Installation Process Walkthrough**

- **Download and Execute the Script:** The command downloads the `install.sh` script from hybr.dev and executes it using bash.
- **Dependency Check:** The script first attempts to detect your system's package manager (apt-get, pacman, or xbps-install). It then checks if go, docker, docker-compose, and tailscale are already installed.
- **Dependency Installation (if needed):** If any of the required dependencies are missing, the script will prompt you to install them. If you confirm, the script will use your system's package manager to install the missing dependencies.
    - Docker: Installs the Docker Engine and Docker Compose, which are essential for containerizing and managing your services.
    - Go: Installs the Go programming language, which is required for building Hybr.
    - Tailscale: installs tailscale which is used to setup the VPN.
- **Hybr Installation:** The script will:
    - Fetch the latest version of Hybr from the GitHub releases.
    - Download the appropriate binaries for your system architecture.
    - Install the Hybr CLI and Web Console to `/usr/local/bin/`.
    - Create `/var/lib/hybr/` directory with required hybr configs.
- **Service Initialization:** The script runs `hybr init --forceDefaults` to start the service installation process, and force reset to the default configuration.
- **Web Console Setup:** The script will also prompt you to run the web console. If you confirm it will run `hybr-console` which will start the service on :8080 and expose it to your tailscale network on `${HOSTNAME}.${MAGIC_DNS}/_hybr`.

You're now ready to start managing your self-hosted services with Hybr!


## Using Hybr

Once Hybr is installed, you can interact with it through the command-line interface (CLI) or the web console. The steps bellow assume you have accepted the default services.

### Accessing your Services via Tailscale VPN
Hybr uses Tailscale to ensure secure access to your services within your private network. Make sure Tailscale is installed and active on any device you want to use to reach your Hybr services.

### Accessing the Web Console

To access the web console, simply navigate to `localhost:8080/_hybr` on the host machine for hybr, or use the machine's MagicDNS address: `${HOSTNAME}.${MAGIC_DNS}/_hybr`

### Viewing Service Information via Web Console

1.  Open the web console.
2.  You should see `tt-rss` and `nextcloud` as available applications
3.  Click on a service name in the sidebar.
4.  The "Service Info" tab displays key information about the selected service, such as its status, URL, and install date.
5. Click **Global URL** you should see a redirected web page hosting the service.

![Hybr Console](/img/hybr-console.png)

### Managing Services with the CLI
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
