// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GoogleAppleID.COM',
  tagline: '谷歌账号 | 苹果账号 | 谷歌账号购买 | 苹果账号购买 | 谷歌邮箱靓号购买 | Gmail 邮箱靓号购买 | 苹果 Apple ID 购买 | 美国手机号购买 | 美国 eSIM 购买 | Google Voice 靓号购买 | 美国手机靓号购买 | me 邮箱购买 | 苹果绝版账号购买',
  favicon: 'img/googleappleid.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://googleappleid.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'googlevoicehub', // Usually your GitHub org/user name.
  projectName: 'googleappleid', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/apple-microsoft-google.jpg',
      metadata: [
        {
          name: 'description',
          content: 'GoogleAppleID.COM 提供谷歌账号、苹果账号、Google Voice、美国手机号、美国 eSIM 手机卡、Apple ID、美区账号相关教程与服务。',
        },
        {
          name: 'keywords',
          content: '谷歌账号 | 苹果账号 | 谷歌账号购买 | 苹果账号购买 | 谷歌邮箱靓号购买 | Gmail 邮箱靓号购买 | 苹果 Apple ID 购买 | 美国手机号购买 | 美国 eSIM 购买 | Google Voice 靓号购买 | 美国手机靓号购买 | me 邮箱购买 | 苹果绝版账号购买',
        },
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'GoogleAppleID.COM',
        logo: {
          alt: 'GoogleAppleID.COM Logo',
          src: 'img/googleappleid_logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '教程',
          },
          { to: '/blog', label: '博客', position: 'left' },
          {
            href: 'https://ididhub.com/',
            label: 'IDIDHUB.COM',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档中心',
            items: [
              {
                label: '教程',
                to: '/docs/intro',
              },
              {
                label: '博客',
                to: '/blog',
              },
            ],
          },
          {
            title: '联系方式',
            items: [
              {
                label: 'Telegram：@greatnumber',
                href: 'https://t.me/greatnumber',
                className: 'footer-telegram-link',
              },
              {
                label: 'WhatsApp: +1 (863) 666-0000',
                href: 'https://wa.me/+18636660000',
                className: 'footer-whatsapp-link'
              },
              {
                label: 'WeChat: madebygoogle',
                href: 'http://googleappleid.com/img/wechat_qrcode.jpg',
                className: 'footer-wechat-link'
              },
            ],
          },
          {
            title: '商店',
            items: [
              {
                label: 'IDIDHUB.COM',
                href: 'https://ididhub.com/',
              },
              {
                label: '正版苹果美区礼品卡购买',
                href: 'https://giftcard.ididhub.com/',
              },
              {
                label: 'Google Voice 靓号购买',
                href: 'https://www.googlevoicehub.com/',
              },
            ],
          },
          {
            title: '靓号在线',
            items: [
              {
                label: 'Google Voice 靓号在线选号',
                href: 'https://docs.google.com/spreadsheets/d/1S4oc-LGhXnvuo35t1X6O-eAJ21ss_jSGAZucD43op5k/edit?usp=sharing',
                className: 'footer-googlevoice-link'
              },
              {
                label: '谷歌邮箱靓号在线选号',
                href: 'https://docs.google.com/spreadsheets/d/19HLeuoDSFmmOrSLvQpvdmbdcIBYFV7ISdUK_l6ZWoMk/edit?usp=sharing',
                className: 'footer-gmail-link'
              },
              {
                label: '苹果Apple ID在线选号',
                href: 'https://docs.google.com/spreadsheets/d/1HVBeqSC1zxSTEKohAK0dcBM8QSZwGKVSpg4orLRi-wA/edit?usp=sharing',
                className: 'footer-apple-link'
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GoogleAppleID.COM`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
