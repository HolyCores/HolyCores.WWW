import Link from "next/link";
import { notFound } from "next/navigation";

type PageData = {
  eyebrow: string; title: string; intro: string; theme: "lime"|"violet"|"ice";
  stats?: [string,string][];
  sections: { kicker:string; title:string; body:string; points?:string[] }[];
};

const zh: Record<string, PageData> = {
  products:{eyebrow:"COMPUTE AT EVERY SCALE",title:"从云端，到边缘。",intro:"GALAXY、NOVA 与 SPARK 共享同一开放计算底座，让模型跨场景部署不再被硬件割裂。",theme:"ice",stats:[["01","云端系统"],["02","数据中心加速"],["03","边缘推理"]],sections:[
    {kicker:"GALAXY / 天穹",title:"面向主权 AI 的云端智算系统",body:"以高密度计算节点、高带宽互联与统一管理软件构成可横向扩展的生产级 AI 基础设施。",points:["集群级扩展","统一调度与可观测性","训练与大规模推理"]},
    {kicker:"NOVA / 星核",title:"数据中心 AI 加速平台",body:"开放、可编程的 AI 加速卡，为模型训练、微调和推理提供高效算力。",points:["模块化加速卡","高速片间互联","HOLYFLOW 软件支持"]},
    {kicker:"SPARK / 灵核",title:"把智能带到每一个边缘节点",body:"低功耗推理芯片面向机器人、机器视觉与端侧智能，在本地完成实时决策。",points:["低延迟与低功耗","丰富边缘接口","统一模型部署"]}]},
  "products/galaxy":{eyebrow:"CLOUD AI SYSTEM",title:"GALAXY 天穹",intro:"为生产级 AI 构建的可扩展云端智算系统。",theme:"ice",stats:[["SCALE","横向扩展"],["FABRIC","高速互联"],["OPS","统一运维"]],sections:[{kicker:"SYSTEM",title:"从节点到集群，协同设计",body:"计算、网络、散热和系统软件在同一平台内联合优化，帮助客户更快建设自主可控的 AI 基础设施。",points:["高密度计算节点","集群网络与拓扑优化","统一部署、监控与故障管理"]},{kicker:"WORKLOADS",title:"覆盖训练、微调与规模推理",body:"以统一软件环境承载从模型开发到生产服务的完整生命周期。"}]},
  "products/nova":{eyebrow:"AI ACCELERATOR",title:"NOVA 星核",intro:"为数据中心训练与推理打造的开放 AI 加速平台。",theme:"violet",stats:[["MESH","可扩展核心"],["LINK","高速互联"],["OPEN","开放软件"]],sections:[{kicker:"ARCHITECTURE",title:"高吞吐，不牺牲可编程性",body:"可扩展计算核心与片上互联协同工作，为不同模型结构提供灵活映射空间。",points:["面向矩阵与张量计算","高带宽片上数据流","多卡横向扩展"]},{kicker:"FORM FACTOR",title:"融入现有数据中心",body:"标准化加速卡形态与 HOLYFLOW 工具链，让部署、调优和运维更直接。"}]},
  "products/spark":{eyebrow:"EDGE AI PROCESSOR",title:"SPARK 灵核",intro:"在低功耗边缘设备上运行实时 AI。",theme:"lime",stats:[["LOCAL","本地智能"],["LOW","低功耗"],["REALTIME","低延迟"]],sections:[{kicker:"EDGE",title:"计算靠近数据发生的地方",body:"减少云端往返，在机器人、视觉终端与工业设备中实现快速、稳定的本地推理。",points:["机器视觉","自主机器人","工业检测与预测维护"]},{kicker:"ONE STACK",title:"与云端共享同一软件底座",body:"模型可在 NOVA 与 SPARK 之间迁移，缩短从数据中心验证到边缘量产的路径。"}]},
  software:{eyebrow:"HOLYFLOW™ SOFTWARE STACK",title:"让模型自由流动。",intro:"统一编译器、运行时、算子库与开发工具，让同一个模型从 GALAXY 云端系统部署到 SPARK 边缘芯片。",theme:"violet",stats:[["01","模型接入"],["02","图编译优化"],["03","运行与观测"]],sections:[{kicker:"COMPILER",title:"从主流框架到高效机器代码",body:"编译流程完成模型解析、图优化、算子融合与硬件映射，在保持开发体验的同时释放底层性能。",points:["PyTorch / ONNX 工作流","自动图优化","性能分析与调优"]},{kicker:"RUNTIME",title:"一个运行时，覆盖每一种规模",body:"统一设备管理、内存调度与执行接口，降低跨产品部署复杂度。"},{kicker:"OPEN ECOSYSTEM",title:"开放接口，开发者拥有选择权",body:"通过 SDK、示例与文档支持开发者扩展算子、接入框架并构建行业应用。"}]},
  solutions:{eyebrow:"SOLUTIONS",title:"把算力变成业务结果。",intro:"围绕高价值工作负载组合硬件、软件与工程服务，从验证到规模部署。",theme:"lime",stats:[["AI CLOUD","主权智算"],["INDUSTRY","工业智能"],["EDGE","机器人与视觉"]],sections:[{kicker:"SOVEREIGN AI",title:"主权 AI 与私有化智算",body:"以 GALAXY 构建自主可控的模型训练与推理平台，满足数据安全、容量扩展和持续运营需求。",points:["私有化部署","集群容量规划","模型服务与运维"]},{kicker:"ENTERPRISE AI",title:"企业生成式 AI",body:"使用 NOVA 加速知识库、智能体和多模态模型，在成本、延迟和数据边界之间取得平衡。"},{kicker:"EDGE INTELLIGENCE",title:"机器人、视觉与工业边缘",body:"以 SPARK 在设备端完成感知和决策，并与云端模型迭代闭环协同。"}]},
  developers:{eyebrow:"DEVELOPER CENTER",title:"开放未来，由你构建。",intro:"从快速开始到性能调优，为开发者提供构建、移植和部署 AI 工作负载所需的一切。",theme:"violet",stats:[["DOCS","开发文档"],["SDK","工具与示例"],["COMMUNITY","开放协作"]],sections:[{kicker:"GET STARTED",title:"用熟悉的模型工作流开始",body:"导入模型、编译、运行并分析性能。文档和示例将随硬件开发计划逐步开放。",points:["安装 HOLYFLOW SDK","运行参考模型","分析并优化性能"]},{kicker:"BUILD WITH US",title:"参与开放生态",body:"欢迎研究机构、开源开发者与行业伙伴共同扩展算子、模型和解决方案。"}]},
  company:{eyebrow:"ABOUT HOLYCORES",title:"为智能时代重建计算底座。",intro:"HOLYCORES 是一家面向 AI 全场景的计算公司，以开放架构和全栈协同连接云端、数据中心与边缘。",theme:"ice",stats:[["OPEN","开放架构"],["FULL STACK","软硬协同"],["ONE VISION","云边统一"]],sections:[{kicker:"OUR VISION",title:"算力应当开放、可扩展、触手可及",body:"我们相信客户与开发者应该拥有选择、优化和扩展其计算平台的自由。"},{kicker:"HOW WE BUILD",title:"芯片、系统和软件作为一个整体",body:"跨越架构、互联、系统工程与编译软件的联合设计，是 HOLYCORES 的核心方法。",points:["长期技术路线","面向真实工作负载","与客户和生态伙伴共创"]},{kicker:"CAREERS",title:"加入我们，构建下一代算力",body:"我们正在寻找芯片架构、数字设计、系统、编译器、AI 软件和商业化人才。"}]},
  contact:{eyebrow:"CONTACT",title:"让我们一起构建下一步。",intro:"无论你希望部署 AI 基础设施、验证工作负载、加入生态或加入团队，我们都期待与你交流。",theme:"lime",sections:[{kicker:"BUSINESS",title:"产品与解决方案合作",body:"请描述你的工作负载、部署规模与目标时间，我们会安排合适的技术团队联系。",points:["产品咨询","联合验证","生态与渠道合作"]},{kicker:"EMAIL",title:"hello@holycores.com",body:"发送邮件，开启对话。"}]}
};

const en: Record<string, PageData> = {
  products:{eyebrow:"COMPUTE AT EVERY SCALE",title:"From cloud to edge.",intro:"GALAXY, NOVA, and SPARK share one open compute foundation, so models can move without hardware silos.",theme:"ice",stats:[["01","Cloud systems"],["02","Datacenter acceleration"],["03","Edge inference"]],sections:[{kicker:"GALAXY",title:"Cloud AI systems built to scale",body:"Production infrastructure combining dense compute, high-bandwidth fabric, and unified operations.",points:["Scale-out clusters","Unified orchestration","Training and inference"]},{kicker:"NOVA",title:"Open datacenter acceleration",body:"A programmable accelerator platform for training, fine-tuning, and inference."},{kicker:"SPARK",title:"Intelligence at the edge",body:"Low-power processors for robotics, machine vision, and real-time on-device AI."}]},
  software:{eyebrow:"HOLYFLOW™ SOFTWARE STACK",title:"Let models move freely.",intro:"One compiler, runtime, and developer experience from GALAXY cloud systems to SPARK edge processors.",theme:"violet",stats:[["01","Import"],["02","Optimize"],["03","Deploy"]],sections:[{kicker:"COMPILER",title:"From frameworks to efficient machine code",body:"Graph optimization, operator fusion, and hardware mapping without abandoning familiar workflows.",points:["PyTorch and ONNX workflows","Automated graph optimization","Profiling and tuning"]},{kicker:"RUNTIME",title:"One runtime at every scale",body:"Unified execution and device management reduce deployment complexity."},{kicker:"OPEN ECOSYSTEM",title:"Open interfaces. Real choice.",body:"SDKs, examples, and documentation help developers build new solutions."}]},
  solutions:{eyebrow:"SOLUTIONS",title:"Turn compute into outcomes.",intro:"Hardware, software, and engineering support assembled around high-value AI workloads.",theme:"lime",stats:[["AI CLOUD","Sovereign AI"],["ENTERPRISE","Generative AI"],["EDGE","Robotics & vision"]],sections:[{kicker:"SOVEREIGN AI",title:"Private and sovereign AI infrastructure",body:"Build controlled training and inference capacity with GALAXY."},{kicker:"ENTERPRISE AI",title:"Production generative AI",body:"Accelerate retrieval, agents, and multimodal models with NOVA."},{kicker:"EDGE INTELLIGENCE",title:"Robotics and industrial edge",body:"Run perception and decisions locally with SPARK."}]},
  developers:{eyebrow:"DEVELOPER CENTER",title:"Build the open future.",intro:"The tools, documentation, and community needed to port, optimize, and deploy AI workloads.",theme:"violet",stats:[["DOCS","Guides"],["SDK","Tools"],["COMMUNITY","Collaboration"]],sections:[{kicker:"GET STARTED",title:"Start with familiar model workflows",body:"Import, compile, run, and profile reference models.",points:["Install HOLYFLOW","Run a reference model","Profile and optimize"]},{kicker:"BUILD WITH US",title:"Contribute to the ecosystem",body:"We welcome research, open-source, and industry collaborators."}]},
  company:{eyebrow:"ABOUT HOLYCORES",title:"Rebuilding compute for the intelligence era.",intro:"HOLYCORES connects cloud, datacenter, and edge through open architecture and full-stack co-design.",theme:"ice",stats:[["OPEN","Architecture"],["FULL STACK","Co-design"],["ONE VISION","Cloud to edge"]],sections:[{kicker:"OUR VISION",title:"Compute should be open and accessible",body:"Customers and developers deserve the freedom to choose, optimize, and extend their platforms."},{kicker:"HOW WE BUILD",title:"Silicon, systems, and software as one",body:"Cross-layer design turns architecture into deployable products."}]},
  contact:{eyebrow:"CONTACT",title:"Let’s build what’s next.",intro:"Talk with us about products, workload validation, ecosystem partnerships, or careers.",theme:"lime",sections:[{kicker:"BUSINESS",title:"Products and solutions",body:"Tell us about your workload, deployment scale, and target timeline."},{kicker:"EMAIL",title:"hello@holycores.com",body:"Send us a note to start the conversation."}]}
};

export function generateStaticParams() {
  return [...Object.keys(zh).map(k=>({slug:k.split("/")})), ...Object.keys(en).map(k=>({slug:["en",...k.split("/")]})), {slug:["en"]}];
}

export default async function DetailPage({params}:{params:Promise<{slug:string[]}>}) {
  const {slug}=await params; const english=slug[0]==="en"; const key=(english?slug.slice(1):slug).join("/") || "company";
  const data=(english?en:zh)[key]; if(!data) notFound();
  const base=english?"/en":"";
  return <main className={`detail detail-${data.theme}`}>
    <header className="nav detail-nav">
      <Link className="brand" href={base||"/"}><img className="brand-logo" src="/brand/logo-1.0.svg" alt="" /><strong>HOLYCORES</strong></Link>
      <nav><Link href={`${base}/products`}>{english?"Products":"产品"}</Link><Link href={`${base}/software`}>{english?"Software":"软件"}</Link><Link href={`${base}/solutions`}>{english?"Solutions":"解决方案"}</Link><Link href={`${base}/developers`}>{english?"Developers":"开发者"}</Link><Link href={`${base}/company`}>{english?"Company":"公司"}</Link></nav>
      <div className="nav-actions"><Link href={english?`/${key}`:`/en/${key}`}>{english?"中文":"EN"}</Link><Link className="nav-cta" href={`${base}/contact`}>{english?"Contact":"联系"} →</Link></div>
    </header>
    <section className="detail-hero"><p className="eyebrow"><span />{data.eyebrow}</p><h1>{data.title}</h1><p>{data.intro}</p></section>
    {data.stats&&<section className="detail-stats">{data.stats.map(([a,b])=><div key={a}><strong>{a}</strong><span>{b}</span></div>)}</section>}
    <section className="detail-body">{data.sections.map((s,i)=><article key={s.title}><div><small>{String(i+1).padStart(2,"0")} / {s.kicker}</small><h2>{s.title}</h2></div><div><p>{s.body}</p>{s.points&&<ul>{s.points.map(x=><li key={x}>{x}</li>)}</ul>}</div></article>)}</section>
    <section className="detail-cta"><p>{english?"READY TO BUILD?":"准备好开始了吗？"}</p><h2>{english?"Bring your workload.":"带上你的工作负载，"}<br />{english?"We’ll bring the platform.":"我们提供计算平台。"}</h2><Link href={`${base}/contact`}>{english?"Talk to HOLYCORES":"联系 HOLYCORES"} →</Link></section>
    <footer><Link className="brand footer-brand" href={base||"/"}><img className="brand-logo" src="/brand/logo-1.0.svg" alt="" /><strong>HOLYCORES</strong></Link><p>{english?"Open architecture. Maximum performance. Intelligence everywhere.":"开放架构。极致性能。无限智能。"}</p><div><span>© 2026 HOLYCORES</span><Link href={base||"/"}>{english?"Home":"首页"} →</Link></div></footer>
  </main>;
}
