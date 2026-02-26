import teamData from '$content/team/team.json';
import { error } from '@sveltejs/kit';
import type { TeamMember } from '../+page.server';

export function load({ params }) {
    // Find the member in the teamData object.name that, after removing the spaces, matches the params.slug
    const thisMember = teamData.team.find(member => member.name?.replace(/\s/g, '') === params.member.replace(/\s/g, ''));

    // Filter only valid members
    let validMember = thisMember && thisMember.name;

    const member: TeamMember = thisMember as TeamMember;

    if (validMember) {
        return {
            member
        };
    }

    if (!validMember) {
        throw error(404, `Member <strong>${params.member}</strong> not found.<br/><br/><a href="/team/" class="text-primary underline">Go back to the <strong>Team</strong> page?</a>`);
    }
}