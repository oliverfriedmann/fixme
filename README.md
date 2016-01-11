# Fixme

> Assisting you in fixing broken commands in the command line.

Install this globally and you'll have access to the `fixme` command anywhere on your system.

```shell
npm install -g fixme-cli
```


## How to use it 

We have all been there (probably many times a day). We execute a command, and it fails.

```bash
$ git status
HEAD detached at 084178d
nothing to commit, working directory clean
```

In some cases we know how to fix it, and in others we know how to google for a fix. Most of the time, the fix is simple, but it is still a time suck to get it fixed.

Let's see how `fixme` can solve this issue:

```bash
$ fixme !!

-------------------- Running --------------------
HEAD detached at 084178d
nothing to commit, working directory clean


-------------------- Fixing --------------------
We have found a fix: 

----
Fix  : Git Status Detached Head

      Something went wrong with this head, but we can get it back.

      git checkout master
      git pull origin master
----

Do you want to apply the fix? [Y] or return : y
```

By confirming with `y`, we allow `fixme` to automatically run the commands displayed in the fix.


## How does it work

This is a proof of concept implementation. It simply checks the outputs of the last command (``!!`` tells the command line to repeat the last command) and matches it with some code-based "database" (it's not really a database, it's just code) of fixes. If there is a fix, it generates the fixing code which can depend on parameters of the actual command.

That's it, and it is very much work in progress.


## Currently supported fixes

Have a look at the `db` subfolder. It mostly revolves around:
- Version Control (``git`` and ``svn``)
- Package Management (``composer``, ``easy_install``, ``npm``, ``pip``)
- Compilers and Makers (``grunt``)
- Shell Commands (``rm``)
- Network Commands (``ssh``)


## Adding fix recipes

Simply add them to the `db` subfolder. If you think your fixes might be beneficial for the rest of us, please add a pull request.


## TODOs
- Sandboxing fixes
- Reading console output instead of re-running command
- Add operating system to descriptor
- Checking whether the execution of any of the commands of a fix require another fix (recursion)