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
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
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

export interface SectionsCardSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_sections';
  info: {
    displayName: 'CardSection';
  };
  attributes: {
    card: Schema.Attribute.Component<'shared.card', true>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
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
    Differences: Schema.Attribute.Component<'shared.difference', true>;
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

export interface SectionsMediaTeaserSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_media_teaser_sections';
  info: {
    displayName: 'MediaTeaserSection';
  };
  attributes: {
    button: Schema.Attribute.Component<'shared.button', true>;
    headerSection: Schema.Attribute.Component<'shared.section-header', false>;
    images: Schema.Attribute.Media<'images', true>;
    layout: Schema.Attribute.Enumeration<['content-left', 'content-right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'content-left'>;
    link: Schema.Attribute.Component<'shared.link', true>;
    sectionName: Schema.Attribute.String;
    stat: Schema.Attribute.Component<'shared.stat', false>;
    theme: Schema.Attribute.Component<'shared.theme', false>;
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

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
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

export interface SharedDifference extends Struct.ComponentSchema {
  collectionName: 'components_shared_differences';
  info: {
    displayName: 'Difference';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Component<'shared.media-link', false>;
    title: Schema.Attribute.String;
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

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
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

export interface SharedSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headers';
  info: {
    displayName: 'HeaderSection';
  };
  attributes: {
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

export interface SharedTheme extends Struct.ComponentSchema {
  collectionName: 'components_shared_themes';
  info: {
    displayName: 'Theme';
  };
  attributes: {
    theme: Schema.Attribute.Enumeration<['light', 'dark', 'semi-light']>;
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
      'navigation.link': NavigationLink;
      'navigation.nav-group': NavigationNavGroup;
      'navigation.top-bar': NavigationTopBar;
      'navigation.top-nav-item': NavigationTopNavItem;
      'sections.card-section': SectionsCardSection;
      'sections.career-section': SectionsCareerSection;
      'sections.content-hub-section': SectionsContentHubSection;
      'sections.difference-section': SectionsDifferenceSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.media-teaser-section': SectionsMediaTeaserSection;
      'sections.quick-facts-section': SectionsQuickFactsSection;
      'shared.address': SharedAddress;
      'shared.button': SharedButton;
      'shared.card': SharedCard;
      'shared.careers-info': SharedCareersInfo;
      'shared.difference': SharedDifference;
      'shared.form': SharedForm;
      'shared.header-footer-links': SharedHeaderFooterLinks;
      'shared.hero-slider': SharedHeroSlider;
      'shared.link': SharedLink;
      'shared.media-link': SharedMediaLink;
      'shared.section-header': SharedSectionHeader;
      'shared.seo': SharedSeo;
      'shared.social-media-icon-links': SharedSocialMediaIconLinks;
      'shared.stat': SharedStat;
      'shared.theme': SharedTheme;
    }
  }
}
