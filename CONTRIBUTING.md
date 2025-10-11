# Katkıda Bulunma Rehberi

Nitrokit projesine katkıda bulunmak istediğiniz için teşekkür ederiz! Bu rehber, katkıda bulunma sürecinde size yol gösterecektir. Her türlü katkı, topluluğumuz için değerlidir.

## 💬 İletişim

Bir özellik önermek, bir hata bildirmek veya bir soru sormak için lütfen bir [GitHub Issue](https://github.com/nitrokit/nitrokit-nextjs/issues) oluşturun.

## 🚀 Nasıl Katkıda Bulunabilirim?

1.  **Projeyi Fork'layın:** Bu deponun bir kopyasını kendi GitHub hesabınıza oluşturun.
2.  **Yeni Bir Dal (Branch) Oluşturun:** `git checkout -b ozellik/yeni-ozellik` veya `git checkout -b duzeltme/hata-cozumu` gibi anlamlı bir isimle yeni bir dal oluşturun.
3.  **Değişikliklerinizi yapın:** Kodunuzu yazın ve gerekli testleri ekleyin.
4.  **Değişikliklerinizi commit'leyin:** Anlamlı bir commit mesajı ile değişikliklerinizi kaydedin. Projemiz Conventional Commits standardını kullanmaktadır.
    ```bash
    git commit -m "feat: Yeni bir özellik ekle"
    ```
5.  **Branch'inizi push'layın:** `git push origin ozellik/yeni-ozellik` komutu ile branch'inizi kendi fork'unuza gönderin.
6.  **Pull Request (PR) oluşturun:** GitHub üzerinden orijinal depoya bir Pull Request oluşturun. Yaptığınız değişiklikleri açıklayın ve ilgili Issue'yu referans gösterin.

## 🛠️ Geliştirme Ortamı Kurulumu

Projeyi yerel makinenizde çalıştırmak için iki seçeneğiniz vardır:

### Docker ile (Önerilen)

1.  Bilgisayarınızda Docker'ın kurulu ve çalışır durumda olduğundan emin olun.
2.  Proje dizininde `docker-compose up` komutunu çalıştırın.

### Manuel Kurulum (pnpm ile)

1.  Bağımlılıkları yükleyin: `pnpm install`
2.  Geliştirme sunucusunu başlatın: `pnpm dev`

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Commit Mesajı Kuralları

Projemiz, commit mesajları için Conventional Commits standardını takip etmektedir. Bu, sürümlerin otomatik olarak oluşturulmasını sağlar. Lütfen commit mesajlarınızı bu standarda uygun olarak yazın.

Örnekler:
-   `feat: Kullanıcı profili sayfası eklendi`
-   `fix: Giriş formundaki doğrulama hatası düzeltildi`
-   `docs: Katkıda bulunma rehberi güncellendi`

## 🤝 Davranış Kuralları

Bu proje, tüm katılımcılar için güvenli ve kapsayıcı bir ortam sağlamayı amaçlamaktadır. Katkıda bulunarak Davranış Kuralları'nı kabul etmiş olursunuz. Lütfen kabul edilemez davranışları hello@nitrokit.tr adresine bildirin.

---

# Contributing Guide

Thank you for your interest in contributing to the Nitrokit project! This guide will walk you through the contribution process. All contributions, big or small, are valuable to our community.

## 💬 Communication

To suggest a feature, report a bug, or ask a question, please open a GitHub Issue.

## 🚀 How Can I Contribute?

1.  **Fork the Project:** Create a copy of this repository on your own GitHub account.
2.  **Create a New Branch:** Create a new branch with a descriptive name, such as `git checkout -b feature/new-feature` or `git checkout -b fix/bug-fix`.
3.  **Make your changes:** Write your code and add any necessary tests.
4.  **Commit your changes:** Save your changes with a meaningful commit message. Our project uses the Conventional Commits standard.
    ```bash
    git commit -m "feat: Add a new feature"
    ```
5.  **Push your branch:** Push your branch to your own fork with the command `git push origin feature/new-feature`.
6.  **Open a Pull Request (PR):** Create a Pull Request to the original repository from GitHub. Describe the changes you've made and reference the relevant issue.

## 🛠️ Development Setup

You have two options for running the project on your local machine:

### With Docker (Recommended)

1.  Ensure Docker is installed and running on your computer.
2.  Run the `docker-compose up` command in the project directory.

### Manual Setup (with pnpm)

1.  Install dependencies: `pnpm install`
2.  Start the development server: `pnpm dev`

The application will be running at `http://localhost:3000`.

## Commit Message Guidelines

Our project follows the Conventional Commits standard for commit messages. This allows for automated versioning. Please format your commit messages according to this standard.

Examples:
-   `feat: Add user profile page`
-   `fix: Correct validation error in login form`
-   `docs: Update contributing guide`

## 🤝 Code of Conduct

This project aims to provide a safe and inclusive environment for all participants. By contributing, you agree to abide by our Code of Conduct. Please report unacceptable behavior to hello@nitrokit.tr.