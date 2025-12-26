// Dictionary type definition (client-safe)
// This mirrors the structure of ar.json/en.json

export interface Dictionary {
  common: {
    appName: string
    save: string
    cancel: string
    delete: string
    edit: string
    create: string
    search: string
    filter: string
    loading: string
    noResults: string
    actions: string
    confirm: string
    back: string
    next: string
    previous: string
    yes: string
    no: string
    all: string
    none: string
    required: string
    optional: string
    success: string
    error: string
    warning: string
    view: string
    select: string
    createdAt: string
  }
  header: {
    services: string
    blog: string
    about: string
    platform: string
    signUp: string
    login: string
    projects: string
    certificates: string
  }
  navigation: {
    dashboard: string
    projects: string
    certificates: string
    invoices: string
    settings: string
    users: string
    logout: string
    help: string
  }
  auth: {
    login: string
    logout: string
    email: string
    password: string
    name: string
    forgotPassword: string
    loginButton: string
    invalidCredentials: string
    welcomeBack: string
    loginDescription: string
    signUp: string
    createAccount: string
    signUpDescription: string
    dontHaveAccount: string
    alreadyHaveAccount: string
    orContinueWith: string
    confirm: string
    twoFactorCode: string
    twoFactorDescription: string
    resetPassword: string
    resetDescription: string
    newPassword: string
    newPasswordDescription: string
    confirmPassword: string
    sendResetLink: string
    backToLogin: string
    confirmEmail: string
    confirmEmailDescription: string
    emailVerified: string
    verifyingEmail: string
    enterEmail: string
    enterPassword: string
    enterName: string
    providers: {
      google: string
      facebook: string
    }
    errors: {
      emailInUseProvider: string
      somethingWrong: string
      emailNotVerified: string
      invalidCode: string
      expiredCode: string
      userNotFound: string
      invalidToken: string
      expiredToken: string
      passwordRequired: string
    }
    success: {
      emailSent: string
      passwordReset: string
      accountCreated: string
      confirmationSent: string
    }
  }
  dashboard: {
    title: string
    totalProjects: string
    inProgress: string
    pendingInspection: string
    unpaidInvoices: string
    recentProjects: string
    quickActions: string
    newProject: string
    newCertificate: string
    newInvoice: string
    trendingUp: string
    trendingDown: string
  }
  projects: {
    title: string
    newProject: string
    editProject: string
    projectDetails: string
    projectNumber: string
    type: string
    status: string
    description: string
    area: string
    floors: string
    facilityName: string
    facilityType: string
    client: string
    contactPerson: string
    startDate: string
    completionDate: string
    types: {
      FIRE_ALARM: string
      SUPPRESSION: string
      SPRINKLER: string
      MAINTENANCE: string
      CONSULTATION: string
    }
    statuses: {
      PENDING: string
      IN_PROGRESS: string
      INSTALLATION: string
      TESTING: string
      COMPLETED: string
    }
    createSuccess: string
    updateSuccess: string
    deleteSuccess: string
  }
  certificates: {
    title: string
    newCertificate: string
    editCertificate: string
    certificateDetails: string
    certificateNumber: string
    systemType: string
    issueDate: string
    expiryDate: string
    issuedBy: string
    documents: string
    uploadDocument: string
    approve: string
    reject: string
    submit: string
    statuses: {
      DRAFT: string
      SUBMITTED: string
      UNDER_REVIEW: string
      APPROVED: string
      REJECTED: string
    }
    documentTypes: {
      CIVIL_DEFENSE_CERTIFICATE: string
      SYSTEM_DESIGN: string
      INSPECTION_REPORT: string
      TEST_REPORT: string
      MAINTENANCE_CONTRACT: string
      OTHER: string
    }
  }
  invoices: {
    title: string
    newInvoice: string
    editInvoice: string
    invoiceDetails: string
    details: string
    invoiceNumber: string
    subtotal: string
    tax: string
    total: string
    dueDate: string
    paidAt: string
    lineItems: string
    addItem: string
    itemDescription: string
    unitPrice: string
    notes: string
    downloadPdf: string
    markAsPaid: string
    markAsSent: string
    statuses: {
      DRAFT: string
      SENT: string
      PAID: string
      OVERDUE: string
      CANCELLED: string
    }
    currencies: {
      SDG: string
      USD: string
      SAR: string
    }
  }
  settings: {
    title: string
    profile: string
    language: string
    changePassword: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }
  users: {
    title: string
    newUser: string
    editUser: string
    name: string
    email: string
    role: string
    roles: {
      ADMIN: string
      MANAGER: string
      CLERK: string
      VIEWER: string
    }
  }
  validation: {
    required: string
    invalidEmail: string
    minLength: string
    maxLength: string
    invalidNumber: string
    positiveNumber: string
  }
  about: {
    sections: {
      who: { subtitle: string; title: string; description: string }
      why: { subtitle: string; title: string; description: string }
      mission: { subtitle: string; title: string; description: string }
    }
    goals: Array<{ title: string; description: string }>
    boardOfDirectors: {
      subtitle: string
      title: string
      description: string
      members: Array<{ name: string; position: string }>
    }
  }
  marketing: {
    hero: {
      badge: string
      titleLine1: string
      titleLine2: string
      titleMobileLine1: string
      titleMobileLine2: string
      titleMobileLine3: string
      subtitle: string
      cta: string
      trackPlaceholder: string
      trackButton: string
    }
    partners: {
      title: string
    }
    testimonial: {
      quote: string
      author: string
      role: string
    }
    solutions: {
      badge: string
      title: string
      subtitle: string
      items: {
        realTime: { title: string; description: string }
        analytics: { title: string; description: string }
        automated: { title: string; description: string }
        multiCarrier: { title: string; description: string }
        customs: { title: string; description: string }
        warehouse: { title: string; description: string }
      }
    }
    allInOne: {
      badge: string
      title: string
      subtitle: string
      features: {
        documentation: { title: string; description: string }
        tracking: { title: string; description: string }
        invoicing: { title: string; description: string }
        access: { title: string; description: string }
      }
      tags: {
        control: string
        ops: string
        cost: string
        efficiency: string
        speed: string
        accuracy: string
      }
    }
    insights: {
      badge: string
      title: string
      viewAll: string
      articles: {
        article1: { category: string; title: string; description: string; date: string }
        article2: { category: string; title: string; description: string; date: string }
        article3: { category: string; title: string; description: string; date: string }
      }
    }
    services: {
      badge: string
      title: string
      subtitle: string
      items: {
        sea: { type: string; tag1: string; tag2: string; title: string; description: string }
        air: { type: string; tag1: string; tag2: string; title: string; description: string }
        ground: { type: string; tag1: string; tag2: string; title: string; description: string }
      }
    }
    faq: {
      title: string
      titleMobile: string
      subtitle: string
      items: {
        q1: { question: string; answer: string }
        q2: { question: string; answer: string }
        q3: { question: string; answer: string }
        q4: { question: string; answer: string }
        q5: { question: string; answer: string }
      }
    }
    footer: {
      description: string
      quickLinks: string
      services: string
      contact: string
      company: string
      support: string
      copyright: string
      newsletter: {
        title: string
        description: string
        placeholder: string
        button: string
      }
      links: {
        home: string
        features: string
        tracking: string
        solutions: string
        pricing: string
        import: string
        export: string
        warehouse: string
        transport: string
        about: string
        careers: string
        blog: string
        helpCenter: string
        documentation: string
        status: string
      }
      contactInfo: {
        address: string
        phone: string
        email: string
      }
    }
    gas: {
      subtitle: string
      title: string
      description: string
      features: {
        global: { title: string; description: string }
        smart: { title: string; description: string }
        fast: { title: string; description: string }
      }
      stats: {
        containers: string
        containersLabel: string
        delivery: string
        deliveryLabel: string
      }
      cta: string
    }
  }
  chatbot: {
    openChat: string
    closeChat: string
    placeholder: string
    welcomeMessage: string
    noMessages: string
    errorMessage: string
    typing: string
    send: string
    sendMessage: string
    voiceInput: string
    retry: string
    chooseQuestion: string
    speechNotSupported: string
    speechError: string
    quickActions: {
      track: string
      trackQuestion: string
      rates: string
      ratesQuestion: string
      delivery: string
      deliveryQuestion: string
      contact: string
      contactQuestion: string
    }
  }
  table: {
    of: string
    rowsSelected: string
  }
  tracking: {
    title: string
    publicTitle: string
    enterNumber: string
    trackButton: string
    notFound: string
    invalidNumber: string
    currentStatus: string
    estimatedDelivery: string
    lastUpdated: string
    progress: string
    projectInfo: string
    trackingNumber: string
    facilityName: string
    projectType: string
    client: string
    copyLink: string
    linkCopied: string
    stages: {
      CONSULTATION: string
      SITE_SURVEY: string
      DESIGN: string
      CIVIL_DEFENSE_APPROVAL: string
      MATERIAL_PROCUREMENT: string
      INSTALLATION: string
      TESTING: string
      INSPECTION: string
      CERTIFICATION: string
      HANDOVER: string
      MAINTENANCE: string
    }
    stageDescriptions: {
      CONSULTATION: string
      SITE_SURVEY: string
      DESIGN: string
      CIVIL_DEFENSE_APPROVAL: string
      MATERIAL_PROCUREMENT: string
      INSTALLATION: string
      TESTING: string
      INSPECTION: string
      CERTIFICATION: string
      HANDOVER: string
      MAINTENANCE: string
    }
    statuses: {
      PENDING: string
      IN_PROGRESS: string
      COMPLETED: string
      SKIPPED: string
    }
    actions: {
      advanceStage: string
      updateStage: string
      updateEta: string
      addNote: string
      markComplete: string
      skip: string
      initializeTracking: string
      generateNumber: string
    }
    eta: string
    completedAt: string
    startedAt: string
    notes: string
    noNotes: string
    addNotes: string
    stageOf: string
  }
}
