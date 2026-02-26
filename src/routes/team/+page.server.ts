import teamData from '$content/team/team.json';
import { type SimpleIconNames } from '$src/lib/components/ui/simple-icons/simple-icons.svelte';

import type { Component } from 'svelte';

import {
    Globe,
    Mail,
    type IconProps,
} from "@lucide/svelte/icons";

// Default and Schematic skeleton for the external links
const predefinedExternalLinks: ExternalLinkData[] = [
    // icon name from typed SimpleIconNames, plus 'website' and 'email'
    {
        type: 'website', // will be used to determine the icon
        title: 'Website', // will be used as the link text for ToolTip
        url: '##', // the link
        icon: Globe // the icon
    },
    {
        type: 'email',
        title: 'Email',
        url: '##',
        icon: Mail
    },

    {
        type: 'discord',
        title: 'Discord',
        url: '##',
        icon: 'discord'
    },
    {
        type: 'facebook',
        title: 'Facebook',
        url: '##',
        icon: 'facebook'
    },
    {
        type: 'github',
        title: 'Github',
        url: '##',
        icon: 'github'
    },
    {
        type: 'googleScholar',
        title: 'Google Scholar',
        url: '##',
        icon: 'googleScholar'
    },
    {
        type: 'instagram',
        title: 'Instagram',
        url: '##',
        icon: 'instagram'
    },
    {
        type: 'linkedin',
        title: 'LinkedIn',
        url: '##',
        icon: 'linkedin'
    },
    {
        type: 'orcid',
        title: 'ORCID',
        url: '##',
        icon: 'orcid'
    },
    {
        type: 'soundcloud',
        title: 'SoundCloud',
        url: '##',
        icon: 'soundcloud'
    },
    {
        type: 'tiktok',
        title: 'TikTok',
        url: '##',
        icon: 'tiktok'
    },
    {
        type: 'vimeo',
        title: 'Vimeo',
        url: '##',
        icon: 'vimeo'
    },
    {
        type: 'x',
        title: 'X',
        url: '##',
        icon: 'x'
    },
    {
        type: 'youtube',
        title: 'YouTube',
        url: '##',
        icon: 'youtube'
    }
];

const predefinedIconTypes = predefinedExternalLinks.map(link => link.type);

export interface ExternalLinkData {
    type: "website" | "email" | "github" | "googleScholar" | "orcid" | "linkedin" | "x" | "discord" | "facebook" | "instagram" | "soundcloud" | "tiktok" | "vimeo" | "youtube";
    title: string;
    url: string;
    icon: SimpleIconNames | Component<IconProps, {}, "">;
}

export interface TeamMember {
    name: string;
    title: string;
    suffix: string;
    includeSuffix: boolean;
    education: string[];
    honorsAndAwards: string[];
    CV: {
        title: string;
        url: string;
    };
    images: string[];
    biography: string[];
    externalLinks: ExternalLinkData[];
    isAlumni: boolean;
    initials?: string; // Add the initials field as optional
}


export function load(): { team: TeamMember[] } {
    // Validate the team data: 
    // fields: name, title, suffix, education, honorsAndAwards, CV, images, biography, externalLinks
    // If any field is missing, default to empty array or string as appropriate
    for (const teamMember of teamData.team as TeamMember[]) {
        if (!teamMember.name) {
            teamMember.name = '';
        }
        if (!teamMember.title) {
            teamMember.title = '';
        }
        if (!teamMember.suffix) {
            teamMember.suffix = '';
        }
        if (!teamMember.includeSuffix) {
            teamMember.includeSuffix = false;
        }
        if (!teamMember.education) {
            teamMember.education = [];
        }
        if (!teamMember.honorsAndAwards) {
            teamMember.honorsAndAwards = [];
        }
        if (!teamMember.CV) {
            teamMember.CV = {
                title: '',
                url: '##'
            };
        }
        if (!teamMember.images) {
            teamMember.images = [];
        }
        if (!teamMember.biography) {
            teamMember.biography = [];
        }
        if (!teamMember.externalLinks) {
            teamMember.externalLinks = [];
        }
        // Validate the external links: if type is not in predefinedIconTypes, default to type 'website'
        for (let link of teamMember.externalLinks as ExternalLinkData[]) {
            if (!predefinedIconTypes.includes(link.type)) {
                link.type = 'website';
            }
            // If the link is missing a title, default to the type
            if (!link.title) {
                link.title = link.type;
            }
            // If the link is missing a url, default to '##'
            if (!link.url) {
                link.url = '##';
            }
        }

        // If isAlumni not of type boolean, default to false
        if (typeof teamMember.isAlumni !== 'boolean') {
            teamMember.isAlumni = false;
        }

        // Add .initials to each member
        teamMember.initials = teamMember.name.split(' ').map(n => n[0]).join('');
    }

    // Remove members with name of empty string
    teamData.team = teamData.team.filter(member => member.name);

    return {
        team: teamData.team as TeamMember[]
    };
}