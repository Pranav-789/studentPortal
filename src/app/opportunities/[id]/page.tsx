import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { opportunities } from "@/data/opportunities";
import Link from "next/link";
import { notFound } from "next/navigation";

// This is a server component
export default async function OpportunityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const opportunity = opportunities.find((opp) => opp.id === id);

    if (!opportunity) {
        notFound();
    }

    return (
        <main style={{ padding: '2rem 24px', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
            <Link href="/opportunities" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', color: 'var(--md-sys-color-secondary)' }}>
                ← Back to Opportunities
            </Link>

            <GlassContainer>
                <div style={{ marginBottom: '2rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        backgroundColor: opportunity.type === 'Internship' ? 'var(--md-sys-color-tertiary-container)' : 'var(--md-sys-color-primary-container)',
                        color: opportunity.type === 'Internship' ? 'var(--md-sys-color-on-tertiary-container)' : 'var(--md-sys-color-on-primary-container)',
                        marginBottom: '1rem'
                    }}>
                        {opportunity.type}
                    </span>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--md-sys-color-on-surface)' }}>
                        {opportunity.title}
                    </h1>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--md-sys-color-primary)', fontWeight: 500 }}>
                        {opportunity.organization}
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    <Card variant="filled">
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', opacity: 0.8 }}>Posted Date</h3>
                        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{opportunity.postedDate}</p>
                    </Card>
                    <Card variant="filled">
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', opacity: 0.8 }}>Application Deadline</h3>
                        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{opportunity.deadline}</p>
                    </Card>
                </div>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--md-sys-color-on-surface)' }}>Description</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--md-sys-color-on-surface-variant)' }}>
                        {opportunity.description}
                    </p>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--md-sys-color-on-surface)' }}>Required Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {opportunity.skills.map(skill => (
                            <span key={skill} style={{
                                fontSize: '1rem',
                                padding: '6px 16px',
                                borderRadius: '8px',
                                border: '1px solid var(--md-sys-color-outline, #79747E)',
                                color: 'var(--md-sys-color-on-surface)'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <Button variant="outlined">Save for Later</Button>
                    <Button variant="filled">Apply Now</Button>
                </div>
            </GlassContainer>
        </main>
    );
}
