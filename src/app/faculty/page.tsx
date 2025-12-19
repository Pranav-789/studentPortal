import { Button } from "@/components/ui/Button";
import { GlassContainer } from "@/components/ui/GlassContainer";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FacultyDashboard() {
    return (
        <main style={{ padding: '2rem 24px', maxWidth: '800px', margin: '0 auto' }}>
            <ScrollReveal width="100%">
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Post an Opportunity</h1>
                    <p style={{ color: 'var(--md-sys-color-secondary)', fontSize: '1.1rem' }}>
                        Share projects and internships with talented students.
                    </p>
                </header>
            </ScrollReveal>

            <ScrollReveal width="100%" delay={0.2}>
                <GlassContainer>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Title</label>
                            <input
                                type="text"
                                placeholder="e.g. AI Research Assistant"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--input-border)',
                                    background: 'var(--input-background)',
                                    color: 'var(--input-color)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Type</label>
                                <select style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--input-border)',
                                    background: 'var(--input-background)',
                                    color: 'var(--input-color)',
                                    fontSize: '1rem'
                                }}>
                                    <option>Project</option>
                                    <option>Internship</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Deadline</label>
                                <input
                                    type="date"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--input-border)',
                                        background: 'var(--input-background)',
                                        color: 'var(--input-color)',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
                            <textarea
                                rows={5}
                                placeholder="Describe the role, responsibilities, and goals..."
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--input-border)',
                                    background: 'var(--input-background)',
                                    color: 'var(--input-color)',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Required Skills (comma separated)</label>
                            <input
                                type="text"
                                placeholder="e.g. Python, React, Machine Learning"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--input-border)',
                                    background: 'var(--input-background)',
                                    color: 'var(--input-color)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <Button variant="filled" style={{ marginTop: '1rem', height: '48px', fontSize: '1.1rem' }}>
                            Post Opportunity
                        </Button>
                    </form>
                </GlassContainer>
            </ScrollReveal>
        </main>
    );
}
