import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '谷歌邮箱靓号 - 2005年注册',
    Svg: require('@site/static/img/Google_logo.svg').default,
    description: (
      <>
        谷歌 Gmail 靓号邮箱，注册时间可追溯至 2004—2005 年，属于早期老账号。
        账号年龄长，历史沉淀深，稳定性极高，日常使用环境成熟，风控概率极低，更适合长期稳定使用。
      </>
    ),
  },
  {
    title: '苹果Apple ID 靓号 - 2012年之前',
    Svg: require('@site/static/img/Apple_Logo_rainbow.svg').default,
    description: (
      <>
        苹果 Apple ID 账号，注册时间早于 2012 年，账号后缀为 <code>@me.com</code> 的稀有经典账号。
        账号稳定性高，全新未使用，可自由更改国家或地区。
      </>
    ),
  },
  {
    title: '苹果美区礼品卡 - 官方渠道',
    Svg: require('@site/static/img/App_Store.svg').default,
    description: (
      <>
        官方渠道购买的苹果美区礼品卡，杜绝黑卡、保证正版安全，不会导致账号封禁。
      </>
    ),
  },
  {
    title: '美国手机靓号 - 超级实用',
    Svg: require('@site/static/img/Google_Voice.svg').default,
    description: (
      <>
        Google Voice 美国靓号，谷歌官方出品，0 月租使用。
        支持定制专属永久号码，提供 T-Mobile 美国实体手机卡。
        拥有一个美国手机号，可用于注册、验证、海外服务使用等多种场景，实用性很高。
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
