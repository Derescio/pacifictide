# GitHub Workflow & Best Practices

> **Project:** PacificTide  
> **Last Updated:** January 2026

---

## Table of Contents

1. [Commit Conventions](#commit-conventions)
2. [Daily Workflow](#daily-workflow)
3. [Branch Strategy](#branch-strategy)
4. [Pull Request Guidelines](#pull-request-guidelines)
5. [Useful Commands](#useful-commands)
6. [Tips & Best Practices](#tips--best-practices)

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear, consistent commit history.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | Description                                      | Example                                        |
|------------|--------------------------------------------------|------------------------------------------------|
| `feat`     | New feature                                      | `feat(auth): add Google OAuth provider`        |
| `fix`      | Bug fix                                          | `fix(carousel): remove blur effect`            |
| `docs`     | Documentation changes                            | `docs: add authentication guide`               |
| `style`    | Formatting, whitespace (no code change)          | `style: fix indentation in hero component`     |
| `refactor` | Code restructure (no feature/fix)                | `refactor(api): simplify auth logic`           |
| `perf`     | Performance improvement                          | `perf(images): optimize lazy loading`          |
| `test`     | Adding or updating tests                         | `test(auth): add login flow tests`             |
| `chore`    | Build, config, dependencies                      | `chore(deps): update next-auth to v5`          |
| `ci`       | CI/CD changes                                    | `ci: add GitHub Actions workflow`              |
| `revert`   | Revert a previous commit                         | `revert: feat(auth): add Google OAuth`         |

### Scopes (Project-Specific)

| Scope      | Area                           |
|------------|--------------------------------|
| `auth`     | Authentication                 |
| `api`      | API routes                     |
| `ui`       | UI components                  |
| `db`       | Database/Prisma                |
| `hero`     | Hero section                   |
| `nav`      | Navigation                     |
| `carousel` | Carousel components            |
| `deps`     | Dependencies                   |

### Examples

```bash
# Feature
git commit -m "feat(carousel): add saunas carousel section"

# Bug fix
git commit -m "fix(auth): resolve session not persisting"

# With body for complex changes
git commit -m "refactor(api): restructure auth routes

- Move auth config to lib/auth.ts
- Add Prisma adapter integration
- Update session callbacks"

# Referencing an issue
git commit -m "fix(nav): mobile menu not closing (#42)"

# Breaking change
git commit -m "feat(api)!: change auth endpoint structure

BREAKING CHANGE: /api/login is now /api/auth/signin"
```

---

## Daily Workflow

### Solo Development

```bash
# 1. Start your day - pull latest changes
git pull origin main

# 2. Check current status
git status

# 3. Make your changes...

# 4. Review what changed
git diff

# 5. Stage changes (specific files preferred)
git add components/hero.tsx
git add components/nav-auth.tsx
# Or stage all
git add .

# 6. Commit with meaningful message
git commit -m "feat(hero): update logo size for large screens"

# 7. Push to remote
git push origin main
```

### Team Development

```bash
# 1. Always start fresh
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/sauna-catalog

# 3. Make commits as you work
git add .
git commit -m "feat(catalog): add product grid layout"
git commit -m "feat(catalog): add filter sidebar"

# 4. Push branch to remote
git push origin feature/sauna-catalog

# 5. Create Pull Request on GitHub

# 6. After PR is merged, clean up
git checkout main
git pull origin main
git branch -d feature/sauna-catalog
```

---

## Branch Strategy

### Branch Naming

```
<type>/<short-description>
```

| Prefix      | Use Case                    | Example                        |
|-------------|-----------------------------|--------------------------------|
| `feature/`  | New features                | `feature/user-dashboard`       |
| `fix/`      | Bug fixes                   | `fix/login-redirect`           |
| `hotfix/`   | Urgent production fixes     | `hotfix/payment-crash`         |
| `refactor/` | Code improvements           | `refactor/auth-structure`      |
| `docs/`     | Documentation               | `docs/api-reference`           |
| `chore/`    | Maintenance tasks           | `chore/update-dependencies`    |

### Branch Hierarchy

```
main (production)
  └── develop (integration - optional)
        ├── feature/user-auth
        ├── feature/product-catalog
        └── fix/cart-total
```

### Protected Branches

For team projects, protect `main`:
- Require pull request reviews
- Require status checks to pass
- Disable force pushes

---

## Pull Request Guidelines

### PR Title

Follow the same convention as commits:
```
feat(auth): add password reset functionality
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added password reset API endpoint
- Created reset email template
- Updated User model with reset token

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests passing

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed my code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

### Code Review Tips

**As Author:**
- Keep PRs small and focused
- Respond to feedback promptly
- Explain your reasoning

**As Reviewer:**
- Be constructive and specific
- Ask questions, don't demand
- Approve when satisfied

---

## Useful Commands

### Everyday Commands

```bash
# Check status
git status

# View commit history
git log --oneline -10

# View changes before staging
git diff

# View staged changes
git diff --staged

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git checkout -- .

# Stash changes temporarily
git stash
git stash pop
```

### Branch Commands

```bash
# List all branches
git branch -a

# Create and switch to branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Delete local branch
git branch -d feature/old-branch

# Delete remote branch
git push origin --delete feature/old-branch
```

### Syncing Commands

```bash
# Fetch without merging
git fetch origin

# Pull with rebase (cleaner history)
git pull --rebase origin main

# Push new branch
git push -u origin feature/new-feature
```

### Fixing Mistakes

```bash
# Amend last commit message
git commit --amend -m "new message"

# Add file to last commit
git add forgotten-file.ts
git commit --amend --no-edit

# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes unstaged
git reset HEAD~1

# Discard last commit completely (DANGEROUS)
git reset --hard HEAD~1

# Revert a specific commit (safe)
git revert <commit-hash>
```

### Viewing History

```bash
# Pretty log
git log --oneline --graph --all

# See who changed what
git blame filename.ts

# Search commits
git log --grep="auth"

# See changes in a commit
git show <commit-hash>
```

---

## Tips & Best Practices

### Do's ✅

1. **Commit often** - Small, focused commits are easier to review and revert
2. **Write meaningful messages** - Future you will thank present you
3. **Pull before push** - Avoid merge conflicts
4. **Use branches** - Even for small features
5. **Review your diff** - Before committing, always check what changed
6. **Keep secrets out** - Never commit `.env` files or API keys

### Don'ts ❌

1. **Don't commit node_modules** - Use `.gitignore`
2. **Don't force push to main** - Unless you absolutely must
3. **Don't commit commented code** - Delete it or use branches
4. **Don't make huge commits** - Break them into logical pieces
5. **Don't commit broken code to main** - Use feature branches

### .gitignore Essentials

```gitignore
# Dependencies
node_modules/

# Environment
.env
.env.local
.env.*.local

# Build output
.next/
out/
build/
dist/

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
```

### PowerShell Aliases (Optional)

Add to your PowerShell profile (`$PROFILE`):

```powershell
# Git shortcuts
function gs { git status }
function ga { git add $args }
function gc { git commit -m $args }
function gp { git push }
function gl { git pull }
function gd { git diff }
function gco { git checkout $args }
function gb { git branch $args }
function glog { git log --oneline -20 }

# Combined commands
function gac { git add . ; git commit -m $args }
function gacp { git add . ; git commit -m $args ; git push }
```

Usage:
```powershell
gs                    # git status
gac "feat: add hero"  # git add . && git commit -m "feat: add hero"
gacp "fix: typo"      # add, commit, and push
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    GIT QUICK REFERENCE                       │
├─────────────────────────────────────────────────────────────┤
│ START DAY        │ git pull origin main                     │
│ NEW FEATURE      │ git checkout -b feature/name             │
│ STAGE CHANGES    │ git add .                                │
│ COMMIT           │ git commit -m "type(scope): message"     │
│ PUSH             │ git push origin branch-name              │
│ SWITCH BRANCH    │ git checkout branch-name                 │
│ VIEW STATUS      │ git status                               │
│ VIEW LOG         │ git log --oneline -10                    │
│ UNDO LAST COMMIT │ git reset --soft HEAD~1                  │
│ DISCARD CHANGES  │ git checkout -- .                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Pro Git Book](https://git-scm.com/book/en/v2)

