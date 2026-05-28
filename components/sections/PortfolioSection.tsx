'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocale } from 'next-intl';

interface Company {
  id: string;
  name: string;
  nameZh: string;
  tagline: string;
  taglineZh: string;
  desc: string;
  descZh: string;
  url?: string;
  logo?: string;
  initial: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

interface Category {
  id: string;
  title: string;
  titleZh: string;
  positioning: string;
  positioningZh: string;
  image: string;
  companies: Company[];
}

const categories: Category[] = [
  {
    id: 'healthcare',
    title: 'Healthcare & Longevity Tech',
    titleZh: '医疗健康与长寿科技',
    positioning: 'Technology-driven companies aligned with regulatory pathways, clinical application, and long-term public health goals.',
    positioningZh: '技术驱动型企业，与监管路径、临床应用及长期公共健康目标紧密结合。',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&q=80&auto=format&fit=crop',
    companies: [
      {
        id: 'angelexo',
        logo: '/logos/angelexo.png',
        name: 'Angelexo',
        nameZh: 'Angelexo',
        tagline: 'Brain-Computer Interface & Neuro-Rehab Robotics',
        taglineZh: '脑机接口与神经康复机器人',
        desc: 'Pioneers non-invasive brain-computer interface (BCI) technology integrated with neuro-rehabilitation robotics. Developing intelligent human-machine interaction systems that decode neural signals to drive motor rehabilitation for stroke survivors and neurological disorder patients. Translates cutting-edge BCI science into clinical-grade recovery solutions.',
        descZh: '深耕非侵入式脑机接口（BCI）技术与神经康复机器人的融合创新。通过解码神经信号驱动运动康复，为中风及神经系统疾病患者开发智能人机交互系统，将前沿BCI科学转化为临床级康复解决方案，推动神经康复领域的技术革新与产业化落地。',
        url: 'https://www.angelexo.com/',
        initial: 'A',
        bgColor: '#EEF7F4',
        textColor: '#0B6E55',
        borderColor: '#AEDDD4',
      },
      {
        id: 'pegbio',
        logo: '/logos/pegbio.png',
        name: 'Pegbio',
        nameZh: '派格生物',
        tagline: 'Long-Acting Biologics',
        taglineZh: '长效生物制药',
        desc: 'Targets diabetes, obesity, and metabolic disease with differentiated long-acting GLP-1 receptor agonists. Core product PB-119 is NDA-stage, leading China\'s innovative approach to chronic disease prevention.',
        descZh: '专注糖尿病、肥胖症及代谢性疾病的创新药物研发。核心产品PB-119为自主研发的长效GLP-1受体激动剂，已进入NDA申报阶段，在2型糖尿病及肥胖症治疗领域具有显著的差异化优势，引领中国慢性病创新疗法的发展方向。',
        url: 'https://www.pegbio.com/en',
        initial: 'P',
        bgColor: '#EDF4FE',
        textColor: '#1B5FAF',
        borderColor: '#B0D0F8',
      },
      {
        id: 'bdgene',
        logo: '/logos/bdgene.png',
        name: 'BDgene',
        nameZh: '本导基因',
        tagline: 'In Vivo CRISPR Gene Editing',
        taglineZh: '体内基因编辑疗法',
        desc: 'Pioneers in vivo CRISPR/Cas9 gene editing via proprietary VLP and lentiviral delivery platforms. Lead program BD111 — the world\'s first CRISPR antiviral therapeutic targeting herpetic stromal keratitis — holds FDA IND clearance, Phase II clinical status, and EU Orphan Drug Designation.',
        descZh: '以自主研发的VLP病毒样颗粒及慢病毒递送平台为核心，深耕体内CRISPR/Cas9基因编辑疗法。核心产品BD111是全球首款CRISPR抗病毒药物，靶向单纯疱疹病毒性角膜基质炎，已获美国FDA IND批准并推进至II期临床，同时获欧盟孤儿药资格认定。BD311、BD112等多条管线覆盖湿性老年性黄斑变性、遗传性眼病等适应症，构建差异化基因治疗产品矩阵，已完成超2亿元B轮融资。',
        url: 'https://www.bdgenetherapeutics.com/',
        initial: 'B',
        bgColor: '#E0F2FE',
        textColor: '#0369A1',
        borderColor: '#7DD3FC',
      },
    ],
  },
  {
    id: 'technology',
    title: 'Advanced Technology & Industrial Intelligence',
    titleZh: '先进技术与工业智能',
    positioning: 'Foundational technologies enabling national digital infrastructure, industrial upgrading, and operational resilience.',
    positioningZh: '构建国家数字基础设施、推动工业升级与保障运营韧性的核心底层技术。',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80&auto=format&fit=crop',
    companies: [
      {
        id: 'minisilicon',
        logo: '/logos/minisilicon.png',
        name: 'Minisilicon',
        nameZh: '米硅科技',
        tagline: 'Optical Communication Chips',
        taglineZh: '光通信芯片',
        desc: 'Develops high-speed, high-reliability chips for optical communication and data centers. Supports 400G+ data infrastructures essential for cloud computing and AI scalability.',
        descZh: '研发面向光通信与数据中心的高速、高可靠性芯片产品，支撑400G+数据传输基础设施。核心团队源自硅谷，拥有超过20年光通信芯片研发经验，产品涵盖高性能激光驱动器、高速SerDes PHY等，为云计算与人工智能规模化部署提供核心算力保障。',
        url: 'http://en.minisilicon.com',
        initial: 'M',
        bgColor: '#F3F0FE',
        textColor: '#5E35B1',
        borderColor: '#C5B8F8',
      },
      {
        id: 'hawkeyes',
        logo: '/logos/hawkeyes.png',
        name: 'Hawkeyes',
        nameZh: '禾楷电气',
        tagline: 'Industrial Safety Intelligence',
        taglineZh: '工业安全智能化',
        desc: 'Delivers real-time diagnostics for high-voltage electrical systems in substations and factories. Addresses critical infrastructure safety and operational continuity across industrial environments.',
        descZh: '为变电站及工厂高压电气系统提供实时诊断与预测性监测服务，有效解决工业基础设施安全运营的关键挑战。通过智能传感与数据分析技术，实现电气设备健康状态的全天候监测，大幅降低安全事故风险，确保电力系统稳定连续运行。',
        url: 'https://www.hawkeyes.com.cn/',
        initial: 'H',
        bgColor: '#FFF5E6',
        textColor: '#B45309',
        borderColor: '#F6D490',
      },
      {
        id: 'surmeta',
        logo: '/logos/surmeta.png',
        name: 'SurMeta',
        nameZh: '申美信息',
        tagline: 'Smart Factory Intelligence',
        taglineZh: '智能工厂解决方案',
        desc: 'Offers human-machine intelligence solutions for China\'s Industry 4.0 evolution, linking data, machines, and people. Also serves hospital and manufacturing clients with digital health infrastructure.',
        descZh: '面向中国工业4.0转型，提供人机融合智能解决方案，实现数据、设备与人员的有机协同。同时深耕医疗与制造两大行业，助力医院信息化与智能制造企业实现自动化升级、数据集成与AI驱动的精准决策，推动产业数字化转型。',
        url: 'https://surmeta.com/',
        initial: 'S',
        bgColor: '#EEF4FF',
        textColor: '#1565C0',
        borderColor: '#B0CCF8',
      },
    ],
  },
  {
    id: 'consumer',
    title: 'New Consumer & Digital Commerce',
    titleZh: '新消费与数字商业',
    positioning: 'Digital-native operators positioned as the intelligent backbone of China\'s evolving consumer economy.',
    positioningZh: '数字原生运营商，构成中国消费经济升级的智能商业底座。',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&auto=format&fit=crop',
    companies: [
      {
        id: 'keying',
        logo: '/logos/keying.png',
        name: 'Keying',
        nameZh: '凯诘电商',
        tagline: 'Full-Stack E-Commerce Operations',
        taglineZh: '全链路电商运营',
        desc: 'China\'s fifth-largest digital retail solutions provider by GMV. End-to-end services from traffic to fulfillment for 200+ global brands across Tmall, JD.com, Douyin, and Pinduoduo.',
        descZh: '中国第五大数字零售解决方案服务商（按GMV计），已于2025年向港交所递交IPO招股书。为200余个全球品牌提供从流量运营到订单履约的全链路服务，覆盖天猫、京东、抖音、拼多多等核心数字零售平台，服务品类横跨快消、美妆、母婴、宠物等多个赛道。',
        url: 'https://www.kaijie.com/',
        initial: 'K',
        bgColor: '#FEF1F1',
        textColor: '#B91C1C',
        borderColor: '#F8C4C4',
      },
      {
        id: 'sensilab',
        logo: '/logos/sensilab.png',
        name: 'Sensilab',
        nameZh: 'Sensilab',
        tagline: 'European Premium Health Supplements',
        taglineZh: '欧洲高端健康营养品',
        desc: 'EU-based premium health supplement brand with 4M+ customers across 40+ countries. Expanding into the China market through a strategic partnership with Leapsun.',
        descZh: '总部位于欧盟斯洛文尼亚的高端健康营养品品牌，产品覆盖40余个国家超400万忠实用户，品类涵盖维生素矿物质、体重管理及健康功能性产品，均符合GMP及HACCP标准。目前正借助与利生投资合创的战略合作，深入布局中国健康消费市场。',
        url: 'https://www.sensilab.com',
        initial: 'S',
        bgColor: '#FFF8EC',
        textColor: '#92400E',
        borderColor: '#FDE5B0',
      },
    ],
  },
];

const traitsEn = [
  { title: 'Niche but Scalable', desc: 'Each company addresses a specific unmet need with potential for broad, long-term market adoption.' },
  { title: 'Tech-Centric with Operational Depth', desc: 'From chips to biotech, the portfolio emphasizes execution — not just vision.' },
  { title: 'Strategically Relevant', desc: 'Focused on longevity, data, and efficiency — three defining themes of the coming decades.' },
];
const traitsZh = [
  { title: '细分但可规模化', desc: '每家企业均聚焦特定未被满足的市场需求，具备广泛长期规模化扩张的潜力。' },
  { title: '技术驱动，运营深厚', desc: '从芯片到生物技术，投资组合强调落地执行——而非仅停留于愿景。' },
  { title: '战略高度契合', desc: '聚焦长寿、数据与效率三大主题，精准把握未来数十年的产业转型方向。' },
];

function CompanyCard({ company, delay, locale }: { company: Company; delay: number; locale: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isZh = locale === 'zh';
  const [logoFailed, setLogoFailed] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
      className="group bg-white border border-[#1A2635]/[0.07] p-7 hover:border-[#D4AF37]/40 hover:shadow-[0_6px_28px_rgba(212,175,55,0.12)] transition-all duration-500 flex flex-col"
      style={{ borderTop: `2px solid ${company.borderColor}` }}
    >
      {/* Logo + name row */}
      <div className="flex items-start gap-4 mb-4">
        {company.logo && !logoFailed ? (
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            style={{
              width: '80px',
              height: '48px',
              backgroundColor: company.bgColor,
              border: `1.5px solid ${company.borderColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 8px',
            }}
          >
            <img
              src={company.logo}
              alt={company.name}
              onError={() => setLogoFailed(true)}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </a>
        ) : (
          <div
            className="w-14 h-14 flex-shrink-0 flex items-center justify-center text-xl font-bold transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: company.bgColor,
              color: company.textColor,
              border: `1.5px solid ${company.borderColor}`,
              fontFamily: 'var(--font-geist-sans), sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {company.initial}
          </div>
        )}
        <div className="pt-0.5 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h4 className="text-[#1A2635] text-base font-semibold tracking-tight leading-tight">{company.name}</h4>
            {isZh && company.nameZh !== company.name && (
              <span className="text-[#1A2635]/40 text-xs">{company.nameZh}</span>
            )}
            {!isZh && company.nameZh !== company.name && (
              <span className="text-[#1A2635]/35 text-xs">{company.nameZh}</span>
            )}
          </div>
          <div className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase mt-1">
            {isZh ? company.taglineZh : company.tagline}
          </div>
        </div>
      </div>

      <p className="text-[#1A2635]/55 text-sm leading-[1.75] flex-1">
        {isZh ? company.descZh : company.desc}
      </p>

      {company.url && (
        <div className="mt-5 pt-4 border-t border-[#1A2635]/[0.05]">
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#D4AF37] text-[11px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {isZh ? '访问官网' : 'Visit Website'}
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </motion.div>
  );
}

export default function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const locale = useLocale();
  const isZh = locale === 'zh';
  const traits = isZh ? traitsZh : traitsEn;

  return (
    <section id="portfolio" className="relative py-32 lg:py-48 overflow-hidden" ref={ref}
      style={{ background: 'linear-gradient(160deg, #f8f5f0 0%, #f3efe8 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-label">{isZh ? '投资组合' : 'Portfolio'}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-headline text-[#1A2635]">
              {isZh ? '聚焦创新前沿\n的战略投资' : 'Strategic Focus Across\nInnovation Frontiers'}
            </h2>
            <p className="text-[#1A2635]/50 text-sm max-w-sm leading-relaxed lg:text-right">
              {isZh
                ? '甄选在各自行业通过技术创新、临床洞察与数据驱动重塑格局的先锋企业。'
                : 'Pioneering companies that reshape their industries through technological innovation, clinical insight, and data-driven precision.'}
            </p>
          </div>
        </motion.div>

        {/* Category groups */}
        <div className="flex flex-col gap-24">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.12 + ci * 0.1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            >
              {/* Category image banner */}
              <div className="relative h-44 overflow-hidden mb-8 shadow-md">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(26,38,53,0.88) 0%, rgba(26,38,53,0.55) 60%, rgba(26,38,53,0.30) 100%)' }}
                />
                {/* Text content */}
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#D4AF37] text-[#1A2635] text-xs font-bold leading-none">
                      {ci + 1}
                    </div>
                    <span className="text-[#D4AF37]/80 text-[10px] tracking-[0.35em] uppercase">
                      {isZh ? '投资类别' : `Category ${ci + 1}`}
                    </span>
                  </div>
                  <h3 className="text-white text-xl lg:text-2xl font-light tracking-tight leading-tight mb-1.5">
                    {isZh ? cat.titleZh : cat.title}
                  </h3>
                  <p className="text-white/55 text-xs leading-relaxed max-w-2xl">
                    {isZh ? cat.positioningZh : cat.positioning}
                  </p>
                </div>
              </div>

              {/* Company cards grid */}
              <div className={`grid gap-5 grid-cols-1 md:grid-cols-2 ${cat.companies.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
                {cat.companies.map((company, i) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    delay={0.2 + ci * 0.08 + i * 0.08}
                    locale={locale}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Common traits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mt-24 pt-14 border-t border-[#1A2635]/[0.07]"
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-label">
              {isZh ? '共同特质' : 'Common Traits'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {traits.map((trait, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-0.5 flex-shrink-0 rounded-full mt-1"
                  style={{ background: 'linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.12))', minHeight: '60px' }}
                />
                <div>
                  <div className="text-[#1A2635] text-sm font-semibold mb-2">{trait.title}</div>
                  <div className="text-[#1A2635]/50 text-sm leading-relaxed">{trait.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)' }}
      />
    </section>
  );
}
