# fixme

> Assisting you in fixing broken commands in the command line.

Install this globally and you'll have access to the `fixme` command anywhere on your system.

```shell
npm install -g fixme-cli
```

## Fixing broken comands using `fixme`


```bash
$ git status
HEAD detached at 084178d
nothing to commit, working directory clean

$ fixme !!
fixme git status
HEAD detached at 084178d
nothing to commit, working directory clean


We have found a fix: 

Fix  : Git Status Detached Head

      Something went wrong with this head, but we can get it back.

      git checkout master
      git pull origin master


Do you want to apply the fix? [Y] or return : y
```

This is very much work in progress.


## Adding fix recipes.
Please add pull requests for recipes.


## TODOs
- Sandboxing fixes
- Reading console output instead of re-running command
- Add operating system to descriptor