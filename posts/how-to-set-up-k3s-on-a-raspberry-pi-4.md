---
author: '"Jacob Marshall"'
avatar: '"https://avatars.githubusercontent.com/u/29145479"'
date: 2020-08-22
title: '"How to set up k3s on a raspberry pi 4"'
description: '"You''ll need to download and install raspberry pi imager from the official
  website."'

---
\### Provisioning your pi

You'll need to download and install raspberry pi imager from the \[official website\]([https://www.raspberrypi.org/software/](https://www.raspberrypi.org/software/ "https://www.raspberrypi.org/software/")). After you've done that, open it.

!\[Raspberry pi imager\](![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ya02ovut0aej9nsnl8cs.png))

Then from the choose os menu, select \`Raspberry pi OS (other)\`, and then select \`Raspberry pi OS lite (32 bit)\`. Make sure you have your sd card inserted into your computer, then choose it from the storage menu.

Now, hit \`CTRL + SHIFT + X\` with the imager window focused.

!\[Raspberry pi imager config menu\](![](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/av0ox33s18xkjt1p05ej.png))

Then configure ssh (use a password if you're new to ssh, or otherwise use a public key), wifi (if your not using ethernet), and a hostname. Now hit save, and then hit write to flash your sd card. You might need to authenticate, depending on your OS.

After you've flashed the sd card, remove it, then plug it back into your computer. Now, edit \`cmdline.txt\`, if your using linux, its on the \`boot\` partition of the drive. After the word \`rootwait\`, add a space, then add \`cgroup_memory=1 cgroup_enable=memory\`. Save the file. Now open \`config.txt\` and add \`arm_64bit=1\` to the end of the file.

\### K3S install

Now for the moment of truth! Plug in your sd card, and boot up your pi. SSH in to your pi using the hostname you set, followed by \`.local\`. So \`pi@kube1.local\` for me. Type \`yes\` if prompted to accept the fingerprint. If you used a password, you'll be prompted to enter it, and if you used a public key, you'll be logged in automatically.

Now, will need to use legacy iptables for kubernetes to work properly. Run these commands:

\- \`sudo iptables -F sudo update-alternatives --set iptables /usr/sbin/iptables-legacy\`

\- \`sudo update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy\`

\- \`sudo reboot\`

Your ssh session will close automatically, and you'll need to reconnect. 

Now, you'll need to install k3s. First become root by running \`sudo su -\`, then install k3s by running \`curl -sfL [https://get.k3s.io](https://get.k3s.io "https://get.k3s.io") | sh -\`. After that's done, check for nodes, by running \`kubectl get node\`.

\**If you only have one device in your cluster, read on, and if not, you're all done.**

On your master node (the node that you just set up), run this command to get your token: \`sudo cat /var/lib/rancher/k3s/server/node-token\`. Now on the pi you want to add to your cluster (the node), follow the provisioning steps, and edit the iptables. Now fill in this command: \`curl -sfL [https://get.k3s.io](https://get.k3s.io "https://get.k3s.io") | K3S_TOKEN="\[the output of above command\]" K3S_URL="https://\[your master ip\]:6443" K3S_NODE_NAME="\[name of node\]" sh -\`, and run it on the node. Repeat this for the number of nodes that you have.

Now, why not \[buy me a coffee\]([https://www.buymeacoffee.com/jem](https://www.buymeacoffee.com/jem "https://www.buymeacoffee.com/jem")), or follow me on \[twitter\]([https://twitter.com/jhqcat](https://twitter.com/jhqcat "https://twitter.com/jhqcat")) or \[github\]([https://github.com/jacobhq](https://github.com/jacobhq "https://github.com/jacobhq")). Have a great day. :)