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

### Recommended: Development Branch + Pull Requests

**This is the preferred workflow for PacificTide** - allows comprehensive PR descriptions and review process.

```bash
# 1. Start your day - make sure you're on development
git checkout development
git pull origin development

# 2. Make your changes and test locally...

# 3. Review what changed
git status
git diff

# 4. Stage changes
git add .

# 5. Commit with meaningful message
git commit -m "feat(product): implement accordion UI for configuration"

# 6. Push to development branch
git push origin development

# 7. Go to GitHub and create Pull Request
#    - Navigate to: https://github.com/Derescio/pacifictide
#    - Click "Compare & pull request" button
#    - Base: main ← Compare: development
#    - Write comprehensive PR description (see template below)
#    - Create Pull Request
#    - Merge when ready

# 8. After PR is merged, sync development with main
git checkout development
git pull origin main
```

**Why this workflow?**
- ✅ Write detailed PR descriptions on GitHub
- ✅ Review changes before production
- ✅ Track deployment history
- ✅ Easy rollback if issues arise
- ✅ Professional commit management

### Alternative: Direct Push (Quick Fixes Only)

For very small, urgent hotfixes:

```bash
# 1. Pull latest
git pull origin main

# 2. Make quick fix
# 3. Stage, commit, push
git add .
git commit -m "hotfix(auth): fix session timeout"
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

**Comprehensive template for detailed PRs:**

```markdown
## 📋 Description
Provide a clear and detailed description of what this PR accomplishes and why it was needed.

## 🎯 Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] ♻️ Refactor (no functional changes)
- [ ] 🎨 UI/Style changes
- [ ] ⚡ Performance improvement

## 🔧 Changes Made
List all significant changes:
- Added Shadcn accordion component for product configuration
- Refactored `ProductOptionsSelector` to use accordion sections
- Fixed initial pricing logic (heater now opt-in selection)
- Updated heater schema to support electric and wood-burning types
- Added visual indicators (checkmarks, badges) for selected options

## 🎨 Screenshots / Videos (if applicable)
**Before:**
[Screenshot or video of old UI]

**After:**
[Screenshot or video of new UI]

## 🧪 Testing
- [ ] Tested locally on development server
- [ ] Tested build process (`pnpm build`)
- [ ] Tested on mobile viewport
- [ ] Tested on desktop viewport
- [ ] All features working as expected
- [ ] No console errors

## 📦 Database Changes
- [ ] No database changes
- [ ] Schema updated (migrations included)
- [ ] Seed scripts updated
- [ ] Requires `prisma generate`
- [ ] Requires database reseed

## 🚀 Deployment Notes
Any special instructions for deployment:
- Run `pnpm prisma generate` after deployment
- Environment variables needed: [list if any]
- Database migration required: [yes/no]

## ✅ Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed my code
- [ ] Commented complex/non-obvious code
- [ ] Updated relevant documentation
- [ ] No new warnings or errors
- [ ] TypeScript types are properly defined
- [ ] Build passes locally (`pnpm build`)
- [ ] All linter rules passing

## 🔗 Related Issues
Fixes #[issue number] (if applicable)
Relates to #[issue number] (if applicable)

## 📸 Additional Context
Any other context, design decisions, or considerations:
- Why specific approach was chosen
- Alternative approaches considered
- Known limitations or future improvements needed
```

**Minimal template for small changes:**

```markdown
## Description
Brief description of the change.

## Type of Change
- [ ] Bug fix / Feature / Docs / Refactor

## Changes
- Change 1
- Change 2

## Testing
- [ ] Tested locally
- [ ] Build passes

## Screenshots (if UI changes)
[Add here]
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

### PacificTide Workflow (Development → PR → Main)

```
┌─────────────────────────────────────────────────────────────────────┐
│              PACIFICTIDE DEVELOPMENT WORKFLOW                       │
├─────────────────────────────────────────────────────────────────────┤
│ 1. START          │ git checkout development                       │
│                   │ git pull origin development                    │
├─────────────────────────────────────────────────────────────────────┤
│ 2. WORK           │ [Make your changes]                            │
│                   │ pnpm dev  (test locally)                       │
├─────────────────────────────────────────────────────────────────────┤
│ 3. COMMIT         │ git add .                                      │
│                   │ git commit -m "feat(scope): description"       │
├─────────────────────────────────────────────────────────────────────┤
│ 4. PUSH           │ git push origin development                    │
├─────────────────────────────────────────────────────────────────────┤
│ 5. CREATE PR      │ Go to GitHub → "Compare & pull request"       │
│                   │ Base: main ← Compare: development              │
│                   │ Write detailed description                     │
│                   │ Create Pull Request                            │
├─────────────────────────────────────────────────────────────────────┤
│ 6. MERGE PR       │ Review changes on GitHub                       │
│                   │ Click "Merge pull request"                     │
│                   │ Vercel auto-deploys to production              │
├─────────────────────────────────────────────────────────────────────┤
│ 7. SYNC           │ git pull origin main                           │
│                   │ (development now synced with main)             │
└─────────────────────────────────────────────────────────────────────┘
```

### General Git Commands

```
┌─────────────────────────────────────────────────────────────┐
│                    GIT QUICK REFERENCE                       │
├─────────────────────────────────────────────────────────────┤
│ START DAY        │ git pull origin development              │
│ NEW FEATURE      │ git checkout -b feature/name             │
│ STAGE CHANGES    │ git add .                                │
│ COMMIT           │ git commit -m "type(scope): message"     │
│ PUSH             │ git push origin development              │
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

