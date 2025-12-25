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
  }
  header: {
    home: string
    features: string
    tracking: string
    solutions: string
    pricing: string
    contact: string
    faq: string
    signUp: string
    login: string
  }
  navigation: {
    dashboard: string
    shipments: string
    customs: string
    invoices: string
    settings: string
    users: string
    logout: string
  }
  auth: {
    login: string
    logout: string
    email: string
    password: string
    forgotPassword: string
    loginButton: string
    invalidCredentials: string
    welcomeBack: string
  }
  dashboard: {
    title: string
    totalShipments: string
    inTransit: string
    pendingCustoms: string
    unpaidInvoices: string
    recentShipments: string
    quickActions: string
    newShipment: string
    newDeclaration: string
    newInvoice: string
  }
  shipments: {
    title: string
    newShipment: string
    editShipment: string
    shipmentDetails: string
    shipmentNumber: string
    type: string
    status: string
    description: string
    weight: string
    quantity: string
    containerNumber: string
    vesselName: string
    consignor: string
    consignee: string
    arrivalDate: string
    departureDate: string
    types: {
      IMPORT: string
      EXPORT: string
    }
    statuses: {
      PENDING: string
      IN_TRANSIT: string
      ARRIVED: string
      CLEARED: string
      DELIVERED: string
    }
    createSuccess: string
    updateSuccess: string
    deleteSuccess: string
  }
  customs: {
    title: string
    newDeclaration: string
    editDeclaration: string
    declarationDetails: string
    declarationNumber: string
    hsCode: string
    dutyAmount: string
    taxAmount: string
    currency: string
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
      BILL_OF_LADING: string
      COMMERCIAL_INVOICE: string
      PACKING_LIST: string
      CERTIFICATE_OF_ORIGIN: string
      INSURANCE_CERTIFICATE: string
      OTHER: string
    }
  }
  invoices: {
    title: string
    newInvoice: string
    editInvoice: string
    invoiceDetails: string
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
  marketing: {
    hero: {
      badge: string
      title: string
      subtitle: string
      cta: string
      trackPlaceholder: string
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
      copyright: string
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
      }
      contactInfo: {
        address: string
        phone: string
        email: string
      }
    }
  }
}
