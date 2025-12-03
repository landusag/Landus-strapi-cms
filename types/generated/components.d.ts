import type { Schema, Struct } from '@strapi/strapi';

export interface BannerAnnouncementBar extends Struct.ComponentSchema {
  collectionName: 'components_banner_announcement_bars';
  info: {
    displayName: 'AnnouncementBar';
  };
  attributes: {
    enabled: Schema.Attribute.Boolean;
    link: Schema.Attribute.Component<'shared.link', false>;
    message: Schema.Attribute.Text;
  };
}

export interface FooterBottomBar extends Struct.ComponentSchema {
  collectionName: 'components_footer_bottom_bars';
  info: {
    displayName: 'BottomBar';
  };
  attributes: {
    copyrightText: Schema.Attribute.Text;
    legalLinks: Schema.Attribute.Component<'shared.link', true>;
    MediaLink: Schema.Attribute.Component<'shared.media-link', true>;
  };
}

export interface FooterBrandBar extends Struct.ComponentSchema {
  collectionName: 'components_footer_brand_bars';
  info: {
    displayName: 'BrandBar';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    logoLink: Schema.Attribute.String;
    socialLink: Schema.Attribute.Component<
      'shared.social-media-icon-links',
      true
    >;
    taglineCta: Schema.Attribute.Component<'shared.button', false>;
    TaglineCTAPreText: Schema.Attribute.String;
  };
}

export interface FooterContactBlock extends Struct.ComponentSchema {
  collectionName: 'components_footer_contact_blocks';
  info: {
    displayName: 'ContactBlock';
  };
  attributes: {
    address: Schema.Attribute.Component<'shared.address', true>;
    email: Schema.Attribute.Email;
    link: Schema.Attribute.Component<'navigation.link', true>;
    phone: Schema.Attribute.String;
  };
}

export interface FooterFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_columns';
  info: {
    displayName: 'footerColumn';
  };
  attributes: {
    footerGroup: Schema.Attribute.Component<'footer.footer-group', true>;
    heading: Schema.Attribute.String;
  };
}

export interface FooterFooterGroup extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_groups';
  info: {
    displayName: 'FooterGroup';
  };
  attributes: {
    footerLinks: Schema.Attribute.Component<'navigation.link', true>;
    SubHeading: Schema.Attribute.String;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {};
}

export interface InquiryAddressLink extends Struct.ComponentSchema {
  collectionName: 'components_inquiry_address_links';
  info: {
    displayName: 'AddressLink';
  };
  attributes: {
    address: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface InquiryContactItems extends Struct.ComponentSchema {
  collectionName: 'components_inquiry_contact_items';
  info: {
    displayName: 'ContactItems';
  };
  attributes: {
    label: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['phone', 'email', 'address', 'link']>;
    url: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface InquiryInquiryCards extends Struct.ComponentSchema {
  collectionName: 'components_inquiry_inquiry_cards_s';
  info: {
    displayName: 'InquiryCards ';
  };
  attributes: {
    address: Schema.Attribute.Component<'inquiry.address-link', false>;
    description: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    phone: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface NavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<['_blank', '_self']>;
    URL: Schema.Attribute.String;
  };
}

export interface NavigationNavGroup extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_groups';
  info: {
    displayName: 'NavGroup';
  };
  attributes: {
    links: Schema.Attribute.Component<'navigation.link', true>;
    showDivider: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
  };
}

export interface NavigationTopBar extends Struct.ComponentSchema {
  collectionName: 'components_navigation_top_bars';
  info: {
    displayName: 'TopBar';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', true>;
    SocialLink: Schema.Attribute.Component<
      'shared.social-media-icon-links',
      true
    >;
  };
}

export interface NavigationTopNavItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_top_nav_items';
  info: {
    displayName: 'TopNavItem';
  };
  attributes: {
    groups: Schema.Attribute.Component<'navigation.nav-group', true>;
    label: Schema.Attribute.String;
    menuType: Schema.Attribute.Enumeration<['none', 'simple', 'mega']>;
    simpleLinks: Schema.Attribute.Component<'navigation.link', true>;
  };
}

export interface ProductAccordionContentBlock extends Struct.ComponentSchema {
  collectionName: 'components_product_accordion_content_blocks';
  info: {
    displayName: 'accordionContentBlock';
  };
  attributes: {
    file: Schema.Attribute.Media<'files'>;
    link: Schema.Attribute.Component<'shared.link', true>;
    text: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<['link', 'file', 'text']>;
  };
}

export interface ProductAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_product_accordion_items';
  info: {
    displayName: 'accordionItem';
  };
  attributes: {
    contentBlocks: Schema.Attribute.Component<
      'product.accordion-content-block',
      true
    >;
    description: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductProductSidebar extends Struct.ComponentSchema {
  collectionName: 'components_product_product_sidebars';
  info: {
    displayName: 'ProductSidebar';
  };
  attributes: {
    items: Schema.Attribute.Component<'product.accordion-item', true>;
  };
}

export interface SectionsAcreEdgePortfolioSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_acre_edge_portfolio_sections';
  info: {
    displayName: 'AcreEdgePortfolioSection';
  };
  attributes: {
    acre_edge_portfolios: Schema.Attribute.Relation<
      'oneToMany',
      'api::acre-edge-portfolio.acre-edge-portfolio'
    >;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsCardSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_sections';
  info: {
    displayName: 'CardSection';
  };
  attributes: {
    card: Schema.Attribute.Component<'shared.card', true>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    isSliderRequired: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsCareerSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_career_sections';
  info: {
    displayName: 'CareerSection';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    careersCards: Schema.Attribute.Component<'shared.difference', true>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsContactSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_sections';
  info: {
    displayName: 'ContactSection';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    contactList: Schema.Attribute.Component<'shared.contact-detail', true>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    info: Schema.Attribute.Component<'shared.info', true>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsContentHubSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_content_hub_sections';
  info: {
    displayName: 'ContentHubSection';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    links: Schema.Attribute.Component<'shared.link', true>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsDifferenceSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_difference_sections';
  info: {
    displayName: 'DifferenceSection';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    Differences: Schema.Attribute.Component<'shared.difference', true>;
    gridSize: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 2;
        },
        number
      > &
      Schema.Attribute.DefaultTo<4>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    isHeaderSplit: Schema.Attribute.Boolean;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsExecutionStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_execution_steps_sections';
  info: {
    displayName: 'ExecutionStepsSection';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', true>;
    description: Schema.Attribute.Blocks;
    executionSteps: Schema.Attribute.Component<'shared.execution-steps', true>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsExpandableInfoSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_expandable_info_sections';
  info: {
    displayName: 'ExpandableInfoSection';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    expandableList: Schema.Attribute.Component<'shared.expandable-list', true>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    images: Schema.Attribute.Media<'images', true>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_sections';
  info: {
    displayName: 'FAQSection';
  };
  attributes: {
    faqList: Schema.Attribute.Component<'shared.faq-list', true>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    backgroundType: Schema.Attribute.Enumeration<['image', 'video']>;
    bgImage: Schema.Attribute.Media<'images'>;
    heroSlider: Schema.Attribute.Component<'shared.hero-slider', true>;
    overlayColor: Schema.Attribute.String;
    sectionName: Schema.Attribute.String;
    videoFile: Schema.Attribute.Media<'videos'>;
    videoUrl: Schema.Attribute.Text;
  };
}

export interface SectionsInfoCardsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_info_cards_sections';
  info: {
    displayName: 'InfoCardsSection';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    card: Schema.Attribute.Component<'shared.card', true>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsInquirySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_inquiry_sections';
  info: {
    displayName: 'InquirySection';
  };
  attributes: {
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    inquiryCards: Schema.Attribute.Component<'inquiry.inquiry-cards', true>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsInstructionStepsSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_instruction_steps_sections';
  info: {
    displayName: 'InstructionStepsSection';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', true>;
    header: Schema.Attribute.Component<'shared.section-header', false>;
    link: Schema.Attribute.Component<'shared.link', true>;
    sectionName: Schema.Attribute.String;
    stepInfo: Schema.Attribute.Component<'shared.step-item', true>;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsMediaTeaserSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_media_teaser_sections';
  info: {
    displayName: 'MediaTeaserSection';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', true>;
    enableOverlay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    iFrameURL: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images' | 'videos', true>;
    isHeaderSplit: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    layout: Schema.Attribute.Enumeration<
      ['content-left', 'content-right', 'content-top', 'content-bottom']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'content-left'>;
    link: Schema.Attribute.Component<'shared.link', true>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    MediaType: Schema.Attribute.Enumeration<['image', 'video']>;
    MediaURL: Schema.Attribute.String;
    postButtonText: Schema.Attribute.String;
    QuickFact: Schema.Attribute.Component<'shared.quick-fact-item', true>;
    sectionName: Schema.Attribute.String;
    stat: Schema.Attribute.Component<'shared.stat', false>;
    theme: Schema.Attribute.Component<'shared.theme', false>;
    useCoverMode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface SectionsPageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_page_hero_sections';
  info: {
    displayName: 'PageHeroSection';
  };
  attributes: {
    backgroundMedia: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    BackgroundType: Schema.Attribute.Enumeration<['image', 'video']>;
    breadcrumbs: Schema.Attribute.Component<'shared.bread-crumbs', true>;
    pageTitle: Schema.Attribute.String;
  };
}

export interface SectionsQuickFactsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_quick_facts_sections';
  info: {
    displayName: 'QuickFactsSection';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    sectionName: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.stat', true>;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsResourceListSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_resource_list_sections';
  info: {
    displayName: 'ResourceListSection';
  };
  attributes: {
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    resources: Schema.Attribute.Component<'shared.resource-item', true>;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsTableWithContentSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_table_with_content_sections';
  info: {
    displayName: 'TableWithContentSection';
  };
  attributes: {
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    sectionName: Schema.Attribute.String;
    tableHeaders: Schema.Attribute.Component<'shared.table-headers', true>;
    tableRows: Schema.Attribute.Component<'shared.table-cell', true>;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsTeamSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_team_sections';
  info: {
    displayName: 'TeamSection';
  };
  attributes: {
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    sectionName: Schema.Attribute.String;
    team_categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-category.team-category'
    >;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsTestimonialSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonial_sections';
  info: {
    displayName: 'TestimonialSection';
  };
  attributes: {
    bgImage: Schema.Attribute.Media<'images' | 'videos'>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    sectionName: Schema.Attribute.String;
    testimonials: Schema.Attribute.Component<'shared.testimonial-item', true>;
    testimonialType: Schema.Attribute.Enumeration<
      ['Individual Testimonial', 'Group Testimonial']
    > &
      Schema.Attribute.DefaultTo<'Individual Testimonial'>;
    theme: Schema.Attribute.Component<'shared.theme', false>;
  };
}

export interface SectionsTimelineSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_timeline_sections';
  info: {
    displayName: 'TimelineSection';
  };
  attributes: {
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    layout: Schema.Attribute.Enumeration<
      ['content-left', 'content-right', 'content-top', 'content-bottom']
    >;
    sectionName: Schema.Attribute.String;
    theme: Schema.Attribute.Component<'shared.theme', false>;
    timelineItems: Schema.Attribute.Component<'shared.timeline-item', true>;
  };
}

export interface SharedAddress extends Struct.ComponentSchema {
  collectionName: 'components_shared_addresses';
  info: {
    displayName: 'address';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    line1: Schema.Attribute.String;
    line2: Schema.Attribute.String;
    state: Schema.Attribute.String;
    zip: Schema.Attribute.String;
  };
}

export interface SharedBreadCrumbs extends Struct.ComponentSchema {
  collectionName: 'components_shared_bread_crumbs';
  info: {
    displayName: 'breadCrumbs';
  };
  attributes: {
    breadCrumb: Schema.Attribute.String;
    IsClickable: Schema.Attribute.Boolean;
    URL: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    arrowAlign: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    isShowArrow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    target: Schema.Attribute.Enumeration<['_blank', '_self']>;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['simple', 'primary', 'outline', 'muted']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedCareersInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_careers_infos';
  info: {
    displayName: 'careersInfo';
  };
  attributes: {
    description: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactDetail extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_details';
  info: {
    displayName: 'ContactList';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface SharedDifference extends Struct.ComponentSchema {
  collectionName: 'components_shared_differences';
  info: {
    displayName: 'Difference';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Component<'shared.media-link', false>;
    title: Schema.Attribute.String;
  };
}

export interface SharedExecutionSteps extends Struct.ComponentSchema {
  collectionName: 'components_shared_execution_steps';
  info: {
    displayName: 'ExecutionSteps';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedExpandableList extends Struct.ComponentSchema {
  collectionName: 'components_shared_expandable_lists';
  info: {
    displayName: 'ExpandableList';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SharedFacts extends Struct.ComponentSchema {
  collectionName: 'components_shared_facts';
  info: {
    displayName: 'facts';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    number: Schema.Attribute.BigInteger;
    title: Schema.Attribute.String;
  };
}

export interface SharedFaqList extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_list_s';
  info: {
    displayName: 'FaqList ';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    ctaButton: Schema.Attribute.Component<'shared.button', true>;
    question: Schema.Attribute.Text;
  };
}

export interface SharedForm extends Struct.ComponentSchema {
  collectionName: 'components_shared_forms';
  info: {
    displayName: 'Form';
  };
  attributes: {};
}

export interface SharedHeaderFooterLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_header_footer_links';
  info: {
    displayName: 'HeaderFooterLinks';
  };
  attributes: {
    badge: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_sliders';
  info: {
    displayName: 'HeroSlider';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    highlight: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface SharedInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_infos';
  info: {
    displayName: 'Info';
  };
  attributes: {
    email: Schema.Attribute.Email;
    infoDescription: Schema.Attribute.Text;
    phone: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<['_blank', '_self']>;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.Text;
  };
}

export interface SharedMediaLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_media_links';
  info: {
    displayName: 'MediaLink';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface SharedMyAccountSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_my_account_sections';
  info: {
    displayName: 'myAccountSection';
    icon: 'user';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'shared.button', false>;
    ctaLink: Schema.Attribute.Component<'shared.link', false>;
    sectionLinks: Schema.Attribute.Component<'shared.media-link', true>;
  };
}

export interface SharedQuickFactItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_quick_fact_items';
  info: {
    displayName: 'QuickFactItem';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedResourceItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_resource_items';
  info: {
    displayName: 'ResourceItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    file: Schema.Attribute.Media<'files'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headers';
  info: {
    displayName: 'HeaderSection';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    highlight: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.String & Schema.Attribute.Required;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialMediaIconLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_media_icon_links';
  info: {
    displayName: 'SocialMediaIconLinks';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    Link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Stat';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    subSuffix: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedStepItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_step_items';
  info: {
    displayName: 'StepItem';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedTableCell extends Struct.ComponentSchema {
  collectionName: 'components_shared_table_cells';
  info: {
    displayName: 'tableCell';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', false>;
    showCheckmark: Schema.Attribute.Boolean;
    textValue: Schema.Attribute.Text;
  };
}

export interface SharedTableHeaders extends Struct.ComponentSchema {
  collectionName: 'components_shared_table_headers';
  info: {
    displayName: 'tableHeaders';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface SharedTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonial_items';
  info: {
    displayName: 'TestimonialItem';
  };
  attributes: {
    designation: Schema.Attribute.String;
    fullName: Schema.Attribute.String;
    message: Schema.Attribute.Text;
    photo: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedTheme extends Struct.ComponentSchema {
  collectionName: 'components_shared_themes';
  info: {
    displayName: 'Theme';
  };
  attributes: {
    bgImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    theme: Schema.Attribute.Enumeration<
      ['semi_light', 'light', 'dark', 'bgImage']
    > &
      Schema.Attribute.DefaultTo<'light'>;
  };
}

export interface SharedTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_items';
  info: {
    displayName: 'TimelineItem';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images'>;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'banner.announcement-bar': BannerAnnouncementBar;
      'footer.bottom-bar': FooterBottomBar;
      'footer.brand-bar': FooterBrandBar;
      'footer.contact-block': FooterContactBlock;
      'footer.footer-column': FooterFooterColumn;
      'footer.footer-group': FooterFooterGroup;
      'global.footer': GlobalFooter;
      'inquiry.address-link': InquiryAddressLink;
      'inquiry.contact-items': InquiryContactItems;
      'inquiry.inquiry-cards': InquiryInquiryCards;
      'navigation.link': NavigationLink;
      'navigation.nav-group': NavigationNavGroup;
      'navigation.top-bar': NavigationTopBar;
      'navigation.top-nav-item': NavigationTopNavItem;
      'product.accordion-content-block': ProductAccordionContentBlock;
      'product.accordion-item': ProductAccordionItem;
      'product.product-sidebar': ProductProductSidebar;
      'sections.acre-edge-portfolio-section': SectionsAcreEdgePortfolioSection;
      'sections.card-section': SectionsCardSection;
      'sections.career-section': SectionsCareerSection;
      'sections.contact-section': SectionsContactSection;
      'sections.content-hub-section': SectionsContentHubSection;
      'sections.difference-section': SectionsDifferenceSection;
      'sections.execution-steps-section': SectionsExecutionStepsSection;
      'sections.expandable-info-section': SectionsExpandableInfoSection;
      'sections.faq-section': SectionsFaqSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.info-cards-section': SectionsInfoCardsSection;
      'sections.inquiry-section': SectionsInquirySection;
      'sections.instruction-steps-section': SectionsInstructionStepsSection;
      'sections.media-teaser-section': SectionsMediaTeaserSection;
      'sections.page-hero-section': SectionsPageHeroSection;
      'sections.quick-facts-section': SectionsQuickFactsSection;
      'sections.resource-list-section': SectionsResourceListSection;
      'sections.table-with-content-section': SectionsTableWithContentSection;
      'sections.team-section': SectionsTeamSection;
      'sections.testimonial-section': SectionsTestimonialSection;
      'sections.timeline-section': SectionsTimelineSection;
      'shared.address': SharedAddress;
      'shared.bread-crumbs': SharedBreadCrumbs;
      'shared.button': SharedButton;
      'shared.card': SharedCard;
      'shared.careers-info': SharedCareersInfo;
      'shared.contact-detail': SharedContactDetail;
      'shared.difference': SharedDifference;
      'shared.execution-steps': SharedExecutionSteps;
      'shared.expandable-list': SharedExpandableList;
      'shared.facts': SharedFacts;
      'shared.faq-list': SharedFaqList;
      'shared.form': SharedForm;
      'shared.header-footer-links': SharedHeaderFooterLinks;
      'shared.hero-slider': SharedHeroSlider;
      'shared.info': SharedInfo;
      'shared.link': SharedLink;
      'shared.media-link': SharedMediaLink;
      'shared.my-account-section': SharedMyAccountSection;
      'shared.quick-fact-item': SharedQuickFactItem;
      'shared.resource-item': SharedResourceItem;
      'shared.section-header': SharedSectionHeader;
      'shared.seo': SharedSeo;
      'shared.social-media-icon-links': SharedSocialMediaIconLinks;
      'shared.stat': SharedStat;
      'shared.step-item': SharedStepItem;
      'shared.table-cell': SharedTableCell;
      'shared.table-headers': SharedTableHeaders;
      'shared.testimonial-item': SharedTestimonialItem;
      'shared.theme': SharedTheme;
      'shared.timeline-item': SharedTimelineItem;
    }
  }
}
