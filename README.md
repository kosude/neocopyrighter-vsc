### Deprecation notice and migration (as of 2024-05-30)

Since it's been a year since I last worked on NeoCopyrighter, it is now no longer maintained and (sort of) deprecated. Functionality that was
previously served by this extension can now be done with my new project, [devinit](https://github.com/kosude/devinit) - a command-line utility
written in Rust with official VS Code integration via its [extension](https://marketplace.visualstudio.com/items?itemName=jack-bennett.devinit-vsc).

NeoCopyrighter **will still be available** on the VS Code marketplace, and won't be marked as deprecated there so you **don't need to migrate** if
this extension works well enough for you as-is. Note that as of writing this notice, devinit does reproduce all NeoCopyrighter features, but **not that
smoothly** - UX should improve over time with updates.

Anyone who does decide to migrate to devinit should note that its initial setup is a little more involved, as you will need to download the appropriate
binary from the releases and put it in your PATH (or specify its location in the VSCode extension config), in addition to creating a `devinitrc.yml`
file in any of the expected locations - more information is available on the devinit
[README](https://github.com/kosude/devinit/tree/main?tab=readme-ov-file#readme).

---

<img src="assets/Hero.png">

# NeoCopyrighter

![Lines of code](https://www.aschey.tech/tokei/github.com/kosude/neocopyrighter-vsc)
![VS Code marketplace version](https://img.shields.io/visual-studio-marketplace/v/jack-bennett.neocopyrighter)
![VS Code marketplace last updated](https://img.shields.io/visual-studio-marketplace/last-updated/jack-bennett.neocopyrighter)

NeoCopyrighter is a more recent and customisable rewrite of FordLabs' [Copyrighter](https://github.com/max-wilkinson/copyrighter/) extension. It
is a VS Code extension that automatically includes copyright and licence notices in source files.

For an official TO-DO list, see the [TODO](https://github.com/kosude/neocopyrighter-vsc/blob/master/TODO.md) file on GitHub.

Finally note that I am **not affiliated** with FordLabs or the Ford Motor Company.
