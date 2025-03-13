---
sidebar_position: 1
---

#  Qickstart Guide

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

*   Tailscale (Check out their [quickstart guide](https://tailscale.com/kb/1017/install) if you don't have tailscale yet)
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

Once Hybr is installed, you can interact with it through the command-line interface (CLI) or the web console. The steps should walk through the setup if you accepted the default services

### Step 1: Accessing your Services via Tailscale VPN
Hybr uses Tailscale to ensure secure access to your services within your private network. Make sure Tailscale is installed and active on any device you want to use to reach your Hybr services.

### Step 2: Accessing the Web Console

To access the web console, simply navigate to `localhost:8080/_hybr` on the host machine for hybr, or use the machine's MagicDNS address: `${HOSTNAME}.${MAGIC_DNS}/_hybr`

### Viewing Service Information via Web Console

1.  Open the web console.
2.  You should see `tt-rss` and `nextcloud` as available applications
3.  Click on a service name in the sidebar.
4.  The "Service Info" tab displays key information about the selected service, such as its status, URL, and install date.
5. Click **Global URL** you should see a redirected web page hosting the service.

![Hybr Console](/img/hybr-console.png)

### Managing Services with the CLI

Hybr CLI can be used to retrieve information about your services and to manage them

For example, to list installed services you can run:

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

[Read More About Hybr CLI Here](/docs/cli)
