const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dataFilePath = path.join(__dirname, '../../data/blogData.json');

// Default initial dataset
const generateInitialData = () => {
  // Pre-hashed 'admin123' password using bcrypt
  const hashedPassword = bcrypt.hashSync('admin123', 10);

  const users = [
    {
      _id: 'user_admin_01',
      name: 'Alex Mercer',
      email: 'admin@technova.io',
      password: hashedPassword,
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
    },
  ];

  const categories = [
    { _id: 'cat_01', name: 'Software Development', slug: 'software-development', color: '#2563eb', description: 'Engineering practices, architectures, clean code, and developer productivity.' },
    { _id: 'cat_02', name: 'Artificial Intelligence & Machine Learning', slug: 'artificial-intelligence-machine-learning', color: '#7c3aed', description: 'Generative AI, neural models, LLM orchestration, and modern machine learning pipelines.' },
    { _id: 'cat_03', name: 'Web and Mobile App Development', slug: 'web-and-mobile-app-development', color: '#059669', description: 'Modern front-end frameworks, responsive UI engineering, cross-platform apps, and WebAssembly.' },
    { _id: 'cat_04', name: 'Technology & Innovation', slug: 'technology-innovation', color: '#ea580c', description: 'Breakthrough innovations, emerging hardware, edge computing, and tech revolutions.' },
    { _id: 'cat_05', name: 'Cybersecurity', slug: 'cybersecurity', color: '#dc2626', description: 'Defensive security, zero trust architecture, threat intelligence, and vulnerability remediation.' },
    { _id: 'cat_06', name: 'Cloud Computing', slug: 'cloud-computing', color: '#0284c7', description: 'Serverless architectures, Kubernetes, cloud cost optimization, and multi-cloud strategies.' },
    { _id: 'cat_07', name: 'Industry Insights', slug: 'industry-insights', color: '#4b5563', description: 'Deep-dive technology market analyses, leadership commentary, and engineering culture trends.' },
  ];

  const authors = [
    {
      _id: 'auth_01',
      name: 'Sarah Chen',
      slug: 'sarah-chen',
      email: 'sarah.chen@technova.io',
      role: 'VP of Cloud & Distributed Systems',
      bio: 'Sarah leads enterprise cloud infrastructure and distributed architecture. Formerly Staff Engineer at Google and AWS community builder.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      socialLinks: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    },
    {
      _id: 'auth_02',
      name: 'Marcus Vance',
      slug: 'marcus-vance',
      email: 'marcus.vance@technova.io',
      role: 'Principal AI Researcher & Architect',
      bio: 'Specialist in Large Language Models, agentic workflows, and neural inference optimization. Keynote speaker and open-source contributor.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      socialLinks: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', github: 'https://github.com' },
    },
    {
      _id: 'auth_03',
      name: 'Elena Rostova',
      slug: 'elena-rostova',
      email: 'elena.rostova@technova.io',
      role: 'Director of Cyber Defense & Security Ops',
      bio: 'DevSecOps champion, ethical hacker, and speaker on zero-trust architectures and API security postures.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      socialLinks: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
    },
    {
      _id: 'auth_04',
      name: 'David Kim',
      slug: 'david-kim',
      email: 'david.kim@technova.io',
      role: 'Senior Staff Full Stack Engineer',
      bio: 'Focuses on scalable web applications, React design systems, high-performance Node.js runtimes, and developer tooling.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      socialLinks: { twitter: 'https://twitter.com', github: 'https://github.com' },
    },
  ];

  const tags = [
    { _id: 'tag_01', name: 'Microservices', slug: 'microservices' },
    { _id: 'tag_02', name: 'Kubernetes', slug: 'kubernetes' },
    { _id: 'tag_03', name: 'Generative AI', slug: 'generative-ai' },
    { _id: 'tag_04', name: 'LLMs', slug: 'llms' },
    { _id: 'tag_05', name: 'React', slug: 'react' },
    { _id: 'tag_06', name: 'Node.js', slug: 'nodejs' },
    { _id: 'tag_07', name: 'Zero Trust', slug: 'zero-trust' },
    { _id: 'tag_08', name: 'DevOps', slug: 'devops' },
    { _id: 'tag_09', name: 'TypeScript', slug: 'typescript' },
    { _id: 'tag_10', name: 'Cloud Architecture', slug: 'cloud-architecture' },
    { _id: 'tag_11', name: 'API Security', slug: 'api-security' },
    { _id: 'tag_12', name: 'WebAssembly', slug: 'webassembly' },
  ];

  const posts = [
    // 1. Cloud Computing (Featured Hero)
    {
      _id: 'post_01',
      title: 'Architecting Resilient Cloud-Native Microservices in 2026: Lessons from Enterprise Scale',
      slug: 'architecting-resilient-cloud-native-microservices-2026',
      excerpt: 'Explore battle-tested strategies for building fault-tolerant microservice meshes, decoupling dependencies with asynchronous event streaming, and implementing zero-downtime canary deployments.',
      category: 'cat_06',
      author: 'auth_01',
      tags: ['tag_10', 'tag_02', 'tag_01', 'tag_08'],
      status: 'published',
      publishedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      isFeatured: true,
      isTrending: true,
      views: 3840,
      readingTime: 5,
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      featuredImageCaption: 'Distributed cloud computing infrastructure spanning global edge locations.',
      tableOfContents: [
        { id: 'the-myth-of-infinite-network-reliability', text: 'The Myth of Infinite Network Reliability', level: 2 },
        { id: 'circuit-breakers-and-retry-budgets', text: 'Circuit Breakers and Retry Budgets', level: 2 },
        { id: 'resilience-patterns-comparison', text: 'Resilience Patterns Comparison', level: 2 },
        { id: 'observability-and-chaos-testing', text: 'Observability and Chaos Testing', level: 2 },
        { id: 'concluding-takeaways', text: 'Concluding Takeaways', level: 2 },
      ],
      content: `
<p>As modern technology ecosystems grow in complexity, designing microservices that gracefully withstand cascading failures is no longer a luxury—it is the foundational requirement of enterprise engineering.</p>
<h2 id="the-myth-of-infinite-network-reliability">The Myth of Infinite Network Reliability</h2>
<p>The fallacies of distributed computing state that networks are reliable, latency is zero, and bandwidth is infinite. In reality, packet drops, noisy neighbors, and intermittent cloud routing anomalies occur every millisecond. Engineering for resilience begins by acknowledging failure as an inevitable system state.</p>
<div class="callout-box bg-blue-50 border-l-4 border-blue-600 p-4 rounded my-6">
  <p class="font-semibold text-blue-900">Core Architecture Rule:</p>
  <p class="text-blue-800 text-sm">Decouple critical user flows through asynchronous message brokers such as Apache Kafka or RabbitMQ. If telemetry ingestion slows down, user-facing auth must remain unaffected.</p>
</div>
<h2 id="circuit-breakers-and-retry-budgets">Circuit Breakers and Retry Budgets</h2>
<p>Naive retries often trigger the thundering herd problem. Robust systems implement exponential backoff with jitter alongside circuit breaker patterns:</p>
<pre><code class="language-javascript">const CircuitBreaker = require('opossum');

async function callPaymentGateway(orderPayload) {
  const response = await httpClient.post('/v1/charge', orderPayload);
  return response.data;
}

const breaker = new CircuitBreaker(callPaymentGateway, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 15000
});
</code></pre>
<h2 id="resilience-patterns-comparison">Resilience Patterns Comparison</h2>
<div class="overflow-x-auto my-6">
  <table class="min-w-full divide-y divide-gray-200 border">
    <thead class="bg-gray-50">
      <tr><th class="px-4 py-2 text-left text-xs font-bold uppercase">Pattern</th><th class="px-4 py-2 text-left text-xs font-bold uppercase">Primary Goal</th><th class="px-4 py-2 text-left text-xs font-bold uppercase">Trade-off</th></tr>
    </thead>
    <tbody class="divide-y divide-gray-200 text-sm">
      <tr><td class="px-4 py-2 font-medium">Circuit Breaker</td><td class="px-4 py-2">Fails fast to prevent cascading exhaustion</td><td class="px-4 py-2">Requires degraded UI fallbacks</td></tr>
      <tr><td class="px-4 py-2 font-medium">Bulkhead</td><td class="px-4 py-2">Isolates critical resource pools</td><td class="px-4 py-2">Higher compute allocation overhead</td></tr>
      <tr><td class="px-4 py-2 font-medium">Outbox Pattern</td><td class="px-4 py-2">Guarantees dual writes between DB and Kafka</td><td class="px-4 py-2">Eventual consistency latency</td></tr>
    </tbody>
  </table>
</div>
<h2 id="observability-and-chaos-testing">Observability and Chaos Testing</h2>
<p>Continuous chaos experiments verify that automated self-healing recovers within SLA thresholds before real incidents occur.</p>
<h2 id="concluding-takeaways">Concluding Takeaways</h2>
<p>Modern cloud architecture is about building software that survives partial failure with elegance.</p>
`,
      seo: {
        metaTitle: 'Cloud-Native Microservices Architecture & Resilience in 2026',
        metaDescription: 'In-depth guide to building resilient distributed microservices with circuit breakers, event streaming, and chaos engineering.',
        focusKeywords: ['microservices', 'cloud computing', 'kubernetes', 'resilience'],
      },
    },

    // 2. AI & ML (Featured Hero Secondary 1)
    {
      _id: 'post_02',
      title: 'Building Production Agentic AI Systems: Autonomous Tool Execution & ReAct Loops',
      slug: 'building-production-agentic-ai-systems-autonomous-workflows',
      excerpt: 'Moving past simple chat completions to stateful, multi-agent frameworks capable of tool execution, memory recall, and iterative self-correction.',
      category: 'cat_02',
      author: 'auth_02',
      tags: ['tag_03', 'tag_04', 'tag_09'],
      status: 'published',
      publishedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      isFeatured: true,
      isTrending: true,
      views: 4210,
      readingTime: 6,
      featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      featuredImageCaption: 'Neural representations of multi-agent collaborative graphs.',
      tableOfContents: [
        { id: 'the-anatomy-of-an-autonomous-agent', text: 'The Anatomy of an Autonomous Agent', level: 2 },
        { id: 'react-framework-reasoning-and-acting', text: 'ReAct Framework: Reasoning and Acting', level: 2 },
        { id: 'production-guardrails-and-sandboxes', text: 'Production Guardrails and Sandboxes', level: 2 },
      ],
      content: `
<p>The generative AI revolution has transitioned from conversational chatbots to autonomous agents capable of decomposing complex software engineering goals into discrete steps, invoking external tools, and validating their own output.</p>
<h2 id="the-anatomy-of-an-autonomous-agent">The Anatomy of an Autonomous Agent</h2>
<p>At its core, an autonomous AI agent combines a cognitive LLM core, episodic vector memory, structured tool dispatch, and verification critique loops.</p>
<h2 id="react-framework-reasoning-and-acting">ReAct Framework: Reasoning and Acting</h2>
<p>The ReAct pattern alternates between explicit reasoning traces and tool invocations:</p>
<pre><code class="language-typescript">interface AgentStep {
  thought: string;
  action: { toolName: string; parameters: Record<string, unknown> };
  observation?: unknown;
}
</code></pre>
<h2 id="production-guardrails-and-sandboxes">Production Guardrails and Sandboxes</h2>
<p>When agents execute multi-step trajectories, semantic validators and unit testing sandboxes guarantee safety before modifications are applied.</p>
`,
      seo: {
        metaTitle: 'Building Production Agentic AI Systems: Architecture & Best Practices',
        metaDescription: 'A technical deep-dive into autonomous AI agents, tool invocation, ReAct loops, and production guardrails.',
        focusKeywords: ['agentic ai', 'autonomous agents', 'llms', 'generative ai'],
      },
    },

    // 3. Cybersecurity (Featured Hero Secondary 2)
    {
      _id: 'post_03',
      title: 'Zero Trust Security in Modern Web Engineering: Protecting API Gateways and Identity',
      slug: 'zero-trust-security-in-modern-web-engineering',
      excerpt: 'Why traditional perimeter security has failed, and how to implement identity-based authentication, ephemeral credentials, and mutual TLS across all microservice boundaries.',
      category: 'cat_05',
      author: 'auth_03',
      tags: ['tag_07', 'tag_11', 'tag_08'],
      status: 'published',
      publishedAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      isFeatured: true,
      isTrending: true,
      views: 2950,
      readingTime: 4,
      featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
      featuredImageCaption: 'Zero-trust cryptographic verification protocols securing distributed networks.',
      tableOfContents: [
        { id: 'never-trust-always-verify', text: 'Never Trust, Always Verify', level: 2 },
        { id: 'ephemeral-tokens-and-mtls', text: 'Ephemeral Tokens and Mutual TLS (mTLS)', level: 2 },
        { id: 'securing-api-gateways', text: 'Securing API Gateways', level: 2 },
      ],
      content: `
<p>The perimeter security model has been rendered obsolete by cloud migrations, remote workforces, and sophisticated supply chain attacks.</p>
<h2 id="never-trust-always-verify">Never Trust, Always Verify</h2>
<p>Zero Trust operates on the guiding principle that threats exist both outside and inside the network. Every request must be authenticated, authorized, and encrypted before granting access.</p>
<h2 id="ephemeral-tokens-and-mtls">Ephemeral Tokens and Mutual TLS (mTLS)</h2>
<p>Modern zero trust architectures enforce mutual TLS (mTLS) where both client and server authenticate each other using x509 certificates rotated on an hourly cadence.</p>
<h2 id="securing-api-gateways">Securing API Gateways</h2>
<p>Ensure rate limiting, DDoS mitigation, and request schema validation occur at the edge before untrusted payloads ever reach core application servers.</p>
`,
      seo: {
        metaTitle: 'Zero Trust Security Architecture for Modern Web APIs',
        metaDescription: 'Learn how to implement Zero Trust security, mutual TLS, and ephemeral identity tokens.',
        focusKeywords: ['zero trust', 'cybersecurity', 'api security'],
      },
    },

    // 4. Web & Mobile App Development
    {
      _id: 'post_04',
      title: 'Next-Gen Frontend Architectures: React Server Components, Streaming, and Islands',
      slug: 'next-gen-frontend-architectures-react-server-components-streaming',
      excerpt: 'An engineering review of how React Server Components (RSC), Suspense streaming, and modern compilation pipelines are revolutionizing web performance metrics.',
      category: 'cat_03',
      author: 'auth_04',
      tags: ['tag_05', 'tag_09'],
      status: 'published',
      publishedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: true,
      views: 3190,
      readingTime: 5,
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'the-server-component-paradigm', text: 'The Server Component Paradigm', level: 2 },
        { id: 'suspense-and-http-streaming', text: 'Suspense and HTTP Streaming', level: 2 },
      ],
      content: `
<p>Single-page applications previously pushed hundreds of kilobytes of JavaScript to client browsers, causing significant delays in Time to Interactive (TTI).</p>
<h2 id="the-server-component-paradigm">The Server Component Paradigm</h2>
<p>React Server Components split the component tree between build-time / server-rendered components and interactive client components, keeping heavy libraries on the server.</p>
<h2 id="suspense-and-http-streaming">Suspense and HTTP Streaming</h2>
<p>Server streaming flushes the critical document shell immediately and streams slow-loading data widgets as async chunks arrive.</p>
`,
      seo: { metaTitle: 'React Server Components & Streaming', metaDescription: 'Master modern React performance patterns.' },
    },

    // 5. Software Development
    {
      _id: 'post_05',
      title: 'High-Throughput Node.js: Event Loop Optimization and Asynchronous Profiling',
      slug: 'high-throughput-nodejs-event-loop-optimization',
      excerpt: 'A deep dive into Node.js libuv mechanics, flame graph diagnostics, CPU bottleneck isolation, and worker thread concurrency.',
      category: 'cat_01',
      author: 'auth_04',
      tags: ['tag_06', 'tag_09'],
      status: 'published',
      publishedAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 1820,
      readingTime: 4,
      featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'understanding-libuv-phases', text: 'Understanding libuv Phases', level: 2 },
        { id: 'profiling-with-flamegraphs', text: 'Profiling with Flamegraphs', level: 2 },
      ],
      content: `
<p>High-throughput Node.js microservices often suffer from subtle performance degradations when compute-heavy tasks block the single-threaded event loop.</p>
<h2 id="understanding-libuv-phases">Understanding libuv Phases</h2>
<p>The event loop executes in discrete phases: Timers, Pending Callbacks, Poll, Check (setImmediate), and Close Callbacks.</p>
<h2 id="profiling-with-flamegraphs">Profiling with Flamegraphs</h2>
<p>Use diagnostic tools like clinic flame or 0x to capture stack traces under synthetic load and eliminate synchronous blocks.</p>
`,
      seo: { metaTitle: 'Node.js Event Loop Optimization', metaDescription: 'Techniques for profiling and scaling Node.js runtimes.' },
    },

    // 6. Technology & Innovation
    {
      _id: 'post_06',
      title: 'Quantum Computing and Cryptography: Preparing Post-Quantum Web Infrastructure',
      slug: 'quantum-computing-and-cryptography-post-quantum-web',
      excerpt: 'Examining NIST post-quantum cryptographic standards and how web developers should prepare SSL/TLS handshakes and public-key algorithms.',
      category: 'cat_04',
      author: 'auth_02',
      tags: ['tag_07', 'tag_11'],
      status: 'published',
      publishedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 1940,
      readingTime: 4,
      featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'shors-algorithm-and-public-key-collapse', text: 'Shor\'s Algorithm and Public Key Collapse', level: 2 },
        { id: 'nist-standardized-lattice-cryptography', text: 'NIST Standardized Lattice Cryptography', level: 2 },
      ],
      content: `
<p>The advent of cryptographically relevant quantum computers poses an existential threat to RSA and Elliptic Curve cryptography.</p>
<h2 id="shors-algorithm-and-public-key-collapse">Shor's Algorithm and Public Key Collapse</h2>
<p>Shor's algorithm can solve discrete logarithm and prime factorization problems in polynomial time. Once large-scale quantum computers arrive, current asymmetric cryptography will be breakable in hours.</p>
<h2 id="nist-standardized-lattice-cryptography">NIST Standardized Lattice Cryptography</h2>
<p>NIST has standardized post-quantum algorithms including ML-KEM (Kyber) for key encapsulation and ML-DSA (Dilithium) for digital signatures.</p>
`,
      seo: { metaTitle: 'Post-Quantum Cryptography & Web Security', metaDescription: 'Preparing web infrastructure for post-quantum crypto.' },
    },

    // 7. Industry Insights
    {
      _id: 'post_07',
      title: 'The Evolution of Software Engineering in the Post-AI Era: Developer Perspectives',
      slug: 'evolution-of-software-engineering-post-ai-era',
      excerpt: 'How the role of the software developer is shifting from manual syntax drafting to systems design, rigorous verification, and strategic orchestration.',
      category: 'cat_07',
      author: 'auth_01',
      tags: ['tag_03', 'tag_08'],
      status: 'published',
      publishedAt: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: true,
      views: 4500,
      readingTime: 5,
      featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'from-coder-to-systems-architect', text: 'From Coder to Systems Architect', level: 2 },
        { id: 'the-critical-value-of-verification', text: 'The Critical Value of Verification', level: 2 },
      ],
      content: `
<p>Predictions about the demise of software developers have circulated for decades, from 4GL languages to low-code platforms. Yet software engineering employment continues to evolve rather than disappear.</p>
<h2 id="from-coder-to-systems-architect">From Coder to Systems Architect</h2>
<p>When boilerplate and repetitive CRUD code are written by AI assistants, engineers spend significantly more time on domain modeling, security threat modeling, and distributed consensus.</p>
<h2 id="the-critical-value-of-verification">The Critical Value of Verification</h2>
<p>Code that is easy to generate is also easy to flood codebases with unnoticed defects. The premier skill of the modern developer is verification literacy.</p>
`,
      seo: { metaTitle: 'Software Engineering in the AI Era', metaDescription: 'The transformation of developer roles and workflows.' },
    },

    // 8. Software Development (Clean Architecture)
    {
      _id: 'post_08',
      title: 'Domain-Driven Design and Clean Architecture in Enterprise TypeScript Applications',
      slug: 'domain-driven-design-clean-architecture-typescript',
      excerpt: 'Structuring complex enterprise software systems using bounded contexts, aggregates, value objects, and hexagonal repository ports.',
      category: 'cat_01',
      author: 'auth_04',
      tags: ['tag_09', 'tag_06', 'tag_01'],
      status: 'published',
      publishedAt: new Date(Date.now() - 9 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 2120,
      readingTime: 5,
      featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'separating-domain-from-infrastructure', text: 'Separating Domain from Infrastructure', level: 2 },
        { id: 'aggregates-and-invariants', text: 'Aggregates and Invariants', level: 2 },
      ],
      content: `
<p>As enterprise software projects grow, business logic frequently leaks into database query layers and web controllers, creating tightly coupled monoliths that resist refactoring.</p>
<h2 id="separating-domain-from-infrastructure">Separating Domain from Infrastructure</h2>
<p>Hexagonal architecture (ports and adapters) isolates core business invariants from frameworks, persistence layers, and transport protocols.</p>
<h2 id="aggregates-and-invariants">Aggregates and Invariants</h2>
<p>An aggregate root encapsulates related domain entities and guarantees consistency across state mutations.</p>
`,
      seo: { metaTitle: 'Domain-Driven Design in TypeScript', metaDescription: 'Clean architecture and bounded contexts guide.' },
    },

    // 9. Cloud Computing (Kubernetes Autoscaling)
    {
      _id: 'post_09',
      title: 'Advanced Kubernetes Autoscaling: Combining HPA, KEDA, and Cluster Autoscaler',
      slug: 'advanced-kubernetes-autoscaling-hpa-keda',
      excerpt: 'Fine-tuning horizontal pod autoscaling with custom event-driven metrics from Prometheus and Kafka to cut cloud compute expenditures by 40%.',
      category: 'cat_06',
      author: 'auth_01',
      tags: ['tag_02', 'tag_10', 'tag_08'],
      status: 'published',
      publishedAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 1870,
      readingTime: 4,
      featuredImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'the-limitations-of-cpu-based-scaling', text: 'The Limitations of CPU-Based Scaling', level: 2 },
        { id: 'event-driven-scaling-with-keda', text: 'Event-Driven Scaling with KEDA', level: 2 },
      ],
      content: `
<p>Standard Kubernetes CPU and memory metrics often lag behind sudden traffic surges, causing request drops before pods can spin up.</p>
<h2 id="the-limitations-of-cpu-based-scaling">The Limitations of CPU-Based Scaling</h2>
<p>By the time a pod's CPU utilization passes 80%, the application may already be dropping HTTP requests.</p>
<h2 id="event-driven-scaling-with-keda">Event-Driven Scaling with KEDA</h2>
<p>KEDA allows pods to scale based on Kafka consumer lag, SQS queue depth, or Redis streams, spinning up replicas proactively.</p>
`,
      seo: { metaTitle: 'Kubernetes Autoscaling with KEDA', metaDescription: 'Proactive autoscaling strategies for cloud workloads.' },
    },

    // 10. AI & ML (RAG Pipeline)
    {
      _id: 'post_10',
      title: 'Architecting Enterprise RAG Pipelines: Hybrid Vector Search and Re-Ranking Strategies',
      slug: 'enterprise-rag-pipelines-hybrid-vector-search',
      excerpt: 'Overcoming semantic retrieval limitations with BM25 keyword matching, cross-encoder re-ranking models, and parent document chunking.',
      category: 'cat_02',
      author: 'auth_02',
      tags: ['tag_04', 'tag_03'],
      status: 'published',
      publishedAt: new Date(Date.now() - 11 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 2650,
      readingTime: 5,
      featuredImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'why-dense-embeddings-alone-fail', text: 'Why Dense Embeddings Alone Fail', level: 2 },
        { id: 'hybrid-search-bm25-dense', text: 'Hybrid Search: BM25 + Dense Vectors', level: 2 },
      ],
      content: `
<p>Retrieval-Augmented Generation (RAG) is the gold standard for connecting enterprise knowledge bases with foundation models.</p>
<h2 id="why-dense-embeddings-alone-fail">Why Dense Embeddings Alone Fail</h2>
<p>Pure cosine similarity over dense vector embeddings struggles with exact part numbers, acronyms, and unique entity identifiers.</p>
<h2 id="hybrid-search-bm25-dense">Hybrid Search: BM25 + Dense Vectors</h2>
<p>Reciprocal Rank Fusion (RRF) combines lexical BM25 matching with vector embeddings, achieving 95%+ retrieval accuracy.</p>
`,
      seo: { metaTitle: 'Enterprise RAG Architecture & Hybrid Search', metaDescription: 'Deep guide to high-accuracy retrieval-augmented generation.' },
    },

    // 11. Cybersecurity (DevSecOps)
    {
      _id: 'post_11',
      title: 'Automated DevSecOps: Software Bill of Materials (SBOM) and Supply Chain Integrity',
      slug: 'automated-devsecops-sbom-supply-chain-integrity',
      excerpt: 'Securing npm and container dependencies using CycloneDX, Sigstore cosign signatures, and automated vulnerability gating in GitHub Actions.',
      category: 'cat_05',
      author: 'auth_03',
      tags: ['tag_11', 'tag_08', 'tag_07'],
      status: 'published',
      publishedAt: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 1490,
      readingTime: 4,
      featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'the-rise-of-software-supply-chain-attacks', text: 'The Rise of Software Supply Chain Attacks', level: 2 },
        { id: 'implementing-cryptographic-provenance', text: 'Implementing Cryptographic Provenance', level: 2 },
      ],
      content: `
<p>Over 80% of modern web applications comprise open-source third-party dependencies, creating a massive attack surface.</p>
<h2 id="the-rise-of-software-supply-chain-attacks">The Rise of Software Supply Chain Attacks</h2>
<p>Malicious typosquatting and compromised maintainer credentials have made automated dependency verification mandatory.</p>
<h2 id="implementing-cryptographic-provenance">Implementing Cryptographic Provenance</h2>
<p>Generate CycloneDX SBOMs during build pipelines and sign container images with Sigstore cosign before deploying to clusters.</p>
`,
      seo: { metaTitle: 'DevSecOps & Supply Chain Security', metaDescription: 'SBOM generation and container provenance verification.' },
    },

    // 12. Web & Mobile App Development (WebAssembly)
    {
      _id: 'post_12',
      title: 'WebAssembly in the Browser: Running High-Compute Rust Workloads on the Client',
      slug: 'webassembly-in-browser-high-compute-rust-workloads',
      excerpt: 'How client-side WASM modules compiled from Rust enable near-native image processing, CAD rendering, and audio synthesis in web browsers.',
      category: 'cat_03',
      author: 'auth_04',
      tags: ['tag_12', 'tag_05'],
      status: 'published',
      publishedAt: new Date(Date.now() - 13 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 2180,
      readingTime: 4,
      featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'beyond-javascript-limits', text: 'Beyond JavaScript Limits', level: 2 },
        { id: 'compiling-rust-to-wasm', text: 'Compiling Rust to WASM', level: 2 },
      ],
      content: `
<p>While modern JavaScript V8 engines are highly optimized, CPU-bound tasks like image manipulation or physics engines still suffer from garbage collection pauses.</p>
<h2 id="beyond-javascript-limits">Beyond JavaScript Limits</h2>
<p>WebAssembly delivers deterministic, predictable near-native execution speed directly in the client browser thread.</p>
<h2 id="compiling-rust-to-wasm">Compiling Rust to WASM</h2>
<p>With wasm-pack and wasm-bindgen, engineers can write memory-safe Rust algorithms and seamlessly invoke them from React components.</p>
`,
      seo: { metaTitle: 'WebAssembly in the Browser with Rust', metaDescription: 'High-performance client-side compute with WebAssembly.' },
    },

    // 13. Technology & Innovation (Edge Computing)
    {
      _id: 'post_13',
      title: 'Edge AI Infrastructure: Running Quantized Neural Inference at the Network Edge',
      slug: 'edge-ai-quantized-neural-inference-network-edge',
      excerpt: 'Deploying 4-bit quantized transformer models to global Cloudflare Workers and Fastly compute nodes for sub-50ms international inference latency.',
      category: 'cat_04',
      author: 'auth_02',
      tags: ['tag_03', 'tag_10'],
      status: 'published',
      publishedAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 1760,
      readingTime: 4,
      featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'the-latency-penalty-of-centralized-clouds', text: 'The Latency Penalty of Centralized Clouds', level: 2 },
        { id: 'model-quantization-techniques', text: 'Model Quantization Techniques', level: 2 },
      ],
      content: `
<p>Routing every AI prompt back to central data centers adds significant round-trip network latency for global users.</p>
<h2 id="the-latency-penalty-of-centralized-clouds">The Latency Penalty of Centralized Clouds</h2>
<p>Edge networks terminate TLS connections within 10 milliseconds of users, drastically improving real-time interactive experiences.</p>
<h2 id="model-quantization-techniques">Model Quantization Techniques</h2>
<p>Techniques like AWQ and GGUF reduce 16-bit float model weights to 4-bit integers with minimal loss in perplexity, enabling edge execution.</p>
`,
      seo: { metaTitle: 'Edge AI & Quantized Model Inference', metaDescription: 'Sub-50ms AI inference at the network edge.' },
    },

    // 14. Industry Insights (Remote Engineering)
    {
      _id: 'post_14',
      title: 'Building Resilient Engineering Cultures Across Asynchronous Distributed Teams',
      slug: 'resilient-engineering-cultures-asynchronous-distributed-teams',
      excerpt: 'How top technology organizations replace endless video meetings with Request for Comments (RFC) documents and structured code review rituals.',
      category: 'cat_07',
      author: 'auth_01',
      tags: ['tag_08'],
      status: 'published',
      publishedAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 3100,
      readingTime: 5,
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [
        { id: 'the-fatigue-of-synchronous-collaboration', text: 'The Fatigue of Synchronous Collaboration', level: 2 },
        { id: 'the-rfc-decision-making-framework', text: 'The RFC Decision-Making Framework', level: 2 },
      ],
      content: `
<p>Distributed engineering teams that try to replicate co-located office practices quickly experience calendar exhaustion and slower release velocity.</p>
<h2 id="the-fatigue-of-synchronous-collaboration">The Fatigue of Synchronous Collaboration</h2>
<p>Requiring engineers across 12 time zones to attend real-time meetings fragments deep focus time and harms code quality.</p>
<h2 id="the-rfc-decision-making-framework">The RFC Decision-Making Framework</h2>
<p>Documenting design choices in written RFCs invites structured critique, captures architectural history, and enables thoughtful async alignment.</p>
`,
      seo: { metaTitle: 'Asynchronous Engineering Team Leadership', metaDescription: 'Scaling remote developer culture with written RFCs.' },
    },

    // 15. Scheduled Post Example (Requirement Compliance)
    {
      _id: 'post_15',
      title: 'Scheduled Feature: Emerging Trends in Distributed Graph Databases',
      slug: 'scheduled-feature-emerging-trends-distributed-graph-databases',
      excerpt: 'A preview of upcoming research on distributed graph database topologies, real-time traversal algorithms, and vector-graph unification.',
      category: 'cat_01',
      author: 'auth_02',
      tags: ['tag_10', 'tag_01'],
      status: 'scheduled',
      scheduledAt: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
      publishedAt: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 0,
      readingTime: 3,
      featuredImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [{ id: 'upcoming-research', text: 'Upcoming Research', level: 2 }],
      content: `<p>This post is scheduled for future publication.</p><h2 id="upcoming-research">Upcoming Research</h2><p>Details forthcoming.</p>`,
      seo: { metaTitle: 'Distributed Graph Databases 2026', metaDescription: 'Preview of upcoming graph research.' },
    },

    // 16. Draft Post Example (Requirement Compliance)
    {
      _id: 'post_16',
      title: 'Draft: Enterprise Security Operations Center (SOC) Runbook Checklist',
      slug: 'draft-enterprise-soc-runbook-checklist',
      excerpt: 'Internal draft detailing the 12 incident response steps for critical severity alerts across Kubernetes clusters.',
      category: 'cat_05',
      author: 'auth_03',
      tags: ['tag_07', 'tag_11'],
      status: 'draft',
      publishedAt: new Date().toISOString(),
      isFeatured: false,
      isTrending: false,
      views: 0,
      readingTime: 3,
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      tableOfContents: [{ id: 'incident-response', text: 'Incident Response', level: 2 }],
      content: `<p>Internal draft for team review.</p><h2 id="incident-response">Incident Response</h2><p>Checklist items.</p>`,
      seo: { metaTitle: 'SOC Runbook Checklist Draft', metaDescription: 'Draft runbook.' },
    },
  ];

  return { users, categories, authors, tags, posts };
};

// Storage Engine class
class LocalStorageEngine {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(dataFilePath)) {
        const raw = fs.readFileSync(dataFilePath, 'utf8');
        this.data = JSON.parse(raw);
      } else {
        this.data = generateInitialData();
        this.save();
      }
    } catch (err) {
      console.warn('[LocalStorage] Initializing fallback fresh dataset...');
      this.data = generateInitialData();
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('[LocalStorage] Failed to save dataset to disk:', err.message);
    }
  }

  // Users
  getUserByEmail(email) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    const user = this.data.users.find((u) => u._id === id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  }

  // Categories
  getCategories() {
    return this.data.categories.map((cat) => {
      const count = this.data.posts.filter(
        (p) =>
          p.category === cat._id &&
          (p.status === 'published' ||
            (p.status === 'scheduled' && new Date(p.scheduledAt) <= new Date()))
      ).length;
      return { ...cat, postCount: count };
    });
  }

  getCategoryBySlug(slug) {
    return this.data.categories.find((c) => c.slug === slug);
  }

  createCategory(payload) {
    const newCat = {
      _id: 'cat_' + Date.now(),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    this.data.categories.push(newCat);
    this.save();
    return newCat;
  }

  updateCategory(id, payload) {
    const idx = this.data.categories.findIndex((c) => c._id === id);
    if (idx === -1) return null;
    this.data.categories[idx] = { ...this.data.categories[idx], ...payload, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.categories[idx];
  }

  deleteCategory(id) {
    const idx = this.data.categories.findIndex((c) => c._id === id);
    if (idx === -1) return false;
    this.data.categories.splice(idx, 1);
    this.save();
    return true;
  }

  // Authors
  getAuthors() {
    return this.data.authors.map((auth) => {
      const postCount = this.data.posts.filter((p) => p.author === auth._id).length;
      return { ...auth, postCount };
    });
  }

  getAuthorById(id) {
    return this.data.authors.find((a) => a._id === id);
  }

  createAuthor(payload) {
    const newAuthor = {
      _id: 'auth_' + Date.now(),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    this.data.authors.push(newAuthor);
    this.save();
    return newAuthor;
  }

  updateAuthor(id, payload) {
    const idx = this.data.authors.findIndex((a) => a._id === id);
    if (idx === -1) return null;
    this.data.authors[idx] = { ...this.data.authors[idx], ...payload, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.authors[idx];
  }

  deleteAuthor(id) {
    const idx = this.data.authors.findIndex((a) => a._id === id);
    if (idx === -1) return false;
    this.data.authors.splice(idx, 1);
    this.save();
    return true;
  }

  // Tags
  getTags() {
    return this.data.tags;
  }

  createTag(payload) {
    const newTag = { _id: 'tag_' + Date.now(), ...payload };
    this.data.tags.push(newTag);
    this.save();
    return newTag;
  }

  // Posts
  populatePost(post) {
    if (!post) return null;
    const cat = this.data.categories.find((c) => c._id === post.category) || { name: 'General', slug: 'general', color: '#2563eb' };
    const auth = this.data.authors.find((a) => a._id === post.author) || { name: 'Contributor', role: 'Staff Writer' };
    const populatedTags = (post.tags || []).map((tId) => this.data.tags.find((t) => t._id === tId) || { name: tId, slug: tId });

    return {
      ...post,
      category: cat,
      author: auth,
      tags: populatedTags,
    };
  }

  getPublicPosts({ category, search, sort, page = 1, limit = 6 }) {
    let list = this.data.posts.filter(
      (p) =>
        p.status === 'published' ||
        (p.status === 'scheduled' && new Date(p.scheduledAt) <= new Date())
    );

    if (category) {
      const foundCat = this.data.categories.find((c) => c.slug === category);
      if (foundCat) {
        list = list.filter((p) => p.category === foundCat._id);
      } else {
        list = [];
      }
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          (p.content && p.content.toLowerCase().includes(q))
      );
    }

    if (sort === 'popular') {
      list.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sort === 'oldest') {
      list.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    } else {
      list.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    const total = list.length;
    const skip = (page - 1) * limit;
    const paginated = list.slice(skip, skip + limit).map((p) => {
      const populated = this.populatePost(p);
      const { content, ...withoutContent } = populated;
      return withoutContent;
    });

    return {
      posts: paginated,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
    };
  }

  getFeaturedPosts() {
    const list = this.data.posts
      .filter(
        (p) =>
          p.isFeatured &&
          (p.status === 'published' ||
            (p.status === 'scheduled' && new Date(p.scheduledAt) <= new Date()))
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 4)
      .map((p) => {
        const { content, ...rest } = this.populatePost(p);
        return rest;
      });
    return list;
  }

  getTrendingPosts() {
    const list = this.data.posts
      .filter(
        (p) =>
          p.status === 'published' ||
          (p.status === 'scheduled' && new Date(p.scheduledAt) <= new Date()))
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map((p) => {
        const { content, ...rest } = this.populatePost(p);
        return rest;
      });
    return list;
  }

  getPostBySlug(slug) {
    const post = this.data.posts.find((p) => p.slug === slug);
    if (!post) return null;

    // Increment views
    post.views = (post.views || 0) + 1;
    this.save();

    const populated = this.populatePost(post);

    // Related posts
    const related = this.data.posts
      .filter(
        (p) =>
          p._id !== post._id &&
          p.category === post.category &&
          (p.status === 'published' ||
            (p.status === 'scheduled' && new Date(p.scheduledAt) <= new Date()))
      )
      .slice(0, 3)
      .map((p) => {
        const { content, ...rest } = this.populatePost(p);
        return rest;
      });

    // Previous and Next
    const publishedList = this.data.posts
      .filter(
        (p) =>
          p.status === 'published' ||
          (p.status === 'scheduled' && new Date(p.scheduledAt) <= new Date())
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const currentIndex = publishedList.findIndex((p) => p._id === post._id);
    const prev = currentIndex < publishedList.length - 1 ? publishedList[currentIndex + 1] : null;
    const next = currentIndex > 0 ? publishedList[currentIndex - 1] : null;

    return {
      post: populated,
      relatedPosts: related,
      previousPost: prev ? { title: prev.title, slug: prev.slug } : null,
      nextPost: next ? { title: next.title, slug: next.slug } : null,
    };
  }

  // Admin post operations
  getAdminPosts({ status, search, category, page = 1, limit = 10 }) {
    let list = [...this.data.posts];

    if (status && status !== 'all') {
      list = list.filter((p) => p.status === status);
    }
    if (category) {
      list = list.filter((p) => p.category === category);
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => new Date(b.createdAt || b.publishedAt) - new Date(a.createdAt || a.publishedAt));

    const total = list.length;
    const skip = (page - 1) * limit;
    const paginated = list.slice(skip, skip + limit).map((p) => {
      const { content, ...rest } = this.populatePost(p);
      return rest;
    });

    return {
      posts: paginated,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      currentPage: page,
    };
  }

  getPostById(id) {
    const post = this.data.posts.find((p) => p._id === id);
    return post ? this.populatePost(post) : null;
  }

  createPost(payload) {
    const newPost = {
      _id: 'post_' + Date.now(),
      ...payload,
      views: 0,
      createdAt: new Date().toISOString(),
    };
    this.data.posts.unshift(newPost);
    this.save();
    return this.populatePost(newPost);
  }

  updatePost(id, payload) {
    const idx = this.data.posts.findIndex((p) => p._id === id);
    if (idx === -1) return null;
    this.data.posts[idx] = {
      ...this.data.posts[idx],
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.populatePost(this.data.posts[idx]);
  }

  deletePost(id) {
    const idx = this.data.posts.findIndex((p) => p._id === id);
    if (idx === -1) return false;
    this.data.posts.splice(idx, 1);
    this.save();
    return true;
  }

  getStats() {
    const totalPosts = this.data.posts.length;
    const publishedPosts = this.data.posts.filter((p) => p.status === 'published').length;
    const draftPosts = this.data.posts.filter((p) => p.status === 'draft').length;
    const scheduledPosts = this.data.posts.filter((p) => p.status === 'scheduled').length;
    const totalCategories = this.data.categories.length;
    const totalAuthors = this.data.authors.length;
    const totalViews = this.data.posts.reduce((sum, p) => sum + (p.views || 0), 0);

    const recentPosts = this.data.posts
      .slice(0, 5)
      .map((p) => {
        const pop = this.populatePost(p);
        return {
          _id: pop._id,
          title: pop.title,
          slug: pop.slug,
          status: pop.status,
          views: pop.views,
          publishedAt: pop.publishedAt,
          category: pop.category,
          author: pop.author,
        };
      });

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      scheduledPosts,
      totalCategories,
      totalAuthors,
      totalViews,
      recentPosts,
    };
  }
}

const storage = new LocalStorageEngine();

module.exports = storage;
