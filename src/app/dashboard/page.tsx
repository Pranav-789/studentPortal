"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassContainer } from "@/components/ui/GlassContainer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { opportunities } from "@/data/opportunities";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function DashboardPage() {
    // Mock data for dashboard
    const appliedOpportunities = [opportunities[0], opportunities[3]];
    const savedOpportunities = [opportunities[1]];
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <main style={{ padding: '2rem 24px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            <ScrollReveal width="100%">
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Student Dashboard</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-secondary)' }}>
                        Welcome back! Here's an overview of your applications.
                    </p>
                </header>
            </ScrollReveal>

            <ScrollReveal width="100%" delay={0.1}>
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ width: '8px', height: '32px', background: 'var(--md-sys-color-primary)', borderRadius: '4px' }}></span>
                        Active Applications
                    </h2>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {appliedOpportunities.map(opp => (
                            <motion.div
                                layoutId={`dashboard-${opp.id}`}
                                key={opp.id}
                                onClick={() => setSelectedId(`dashboard-${opp.id}`)}
                                style={{ cursor: 'pointer' }}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <Card variant="elevated" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', pointerEvents: 'none' }}>
                                    <div>
                                        <motion.h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{opp.title}</motion.h3>
                                        <motion.p style={{ color: 'var(--md-sys-color-secondary)' }}>{opp.organization}</motion.p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--md-sys-color-secondary)' }}>Status</span>
                                            <span style={{ fontWeight: 600, color: 'var(--md-sys-color-primary)' }}>Under Review</span>
                                        </div>
                                        <Button variant="glass" style={{ pointerEvents: 'auto' }}>View Status</Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            <ScrollReveal width="100%" delay={0.2}>
                <section>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ width: '8px', height: '32px', background: 'var(--md-sys-color-secondary)', borderRadius: '4px' }}></span>
                        Saved Opportunities
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {savedOpportunities.map(opp => (
                            <motion.div
                                layoutId={`saved-${opp.id}`}
                                key={opp.id}
                                onClick={() => setSelectedId(`saved-${opp.id}`)}
                                style={{ cursor: 'pointer', height: '100%' }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Card variant="elevated" style={{ height: '100%', pointerEvents: 'none' }}>
                                    <motion.h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{opp.title}</motion.h3>
                                    <motion.p style={{ color: 'var(--md-sys-color-secondary)', marginBottom: '1rem' }}>{opp.organization}</motion.p>
                                    <Button variant="glass" style={{ pointerEvents: 'auto' }}>View Details</Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </ScrollReveal>

            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 40
                            }}
                        />
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50,
                            pointerEvents: 'none'
                        }}>
                            {/* Find the opportunity from either list */}
                            {[...appliedOpportunities, ...savedOpportunities].filter(item =>
                                `dashboard-${item.id}` === selectedId || `saved-${item.id}` === selectedId
                            ).map(opp => (
                                <motion.div
                                    layoutId={selectedId}
                                    key={opp.id}
                                    style={{
                                        width: '90%',
                                        maxWidth: '700px',
                                        maxHeight: '85vh',
                                        overflowY: 'auto',
                                        background: 'var(--md-sys-color-surface)',
                                        borderRadius: '24px',
                                        padding: '2rem',
                                        pointerEvents: 'auto',
                                        position: 'relative',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                    }}
                                >
                                    <Button
                                        variant="glass"
                                        onClick={() => setSelectedId(null)}
                                        style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            minWidth: 'auto',
                                            padding: '8px',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px'
                                        }}
                                    >
                                        ✕
                                    </Button>

                                    <span style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        borderRadius: '16px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        backgroundColor: opp.type === 'Internship' ? 'var(--md-sys-color-tertiary-container)' : 'var(--md-sys-color-primary-container)',
                                        color: opp.type === 'Internship' ? 'var(--md-sys-color-on-tertiary-container)' : 'var(--md-sys-color-on-primary-container)',
                                        marginBottom: '1rem'
                                    }}>
                                        {opp.type}
                                    </span>

                                    <motion.h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--md-sys-color-on-surface)' }}>{opp.title}</motion.h2>
                                    <motion.p style={{ fontSize: '1.1rem', color: 'var(--md-sys-color-secondary)', marginBottom: '2rem', fontWeight: 500 }}>
                                        {opp.organization}
                                    </motion.p>

                                    {/* Status Section for Applied Opps */}
                                    {selectedId.startsWith('dashboard') && (
                                        <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--md-sys-color-surface-variant)', borderRadius: '12px' }}>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Application Status</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--md-sys-color-primary)' }}></div>
                                                <span style={{ fontWeight: 600 }}>Under Review</span>
                                                <span style={{ color: 'var(--md-sys-color-secondary)', fontSize: '0.9rem' }}>- Submitted on Nov 25, 2025</span>
                                            </div>
                                        </div>
                                    )}

                                    <motion.div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Description</h3>
                                        <p style={{ lineHeight: 1.7, color: 'var(--md-sys-color-on-surface-variant)' }}>
                                            {opp.description}
                                        </p>
                                    </motion.div>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Required Skills</h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {opp.skills.map(skill => (
                                                <span key={skill} style={{
                                                    fontSize: '0.9rem',
                                                    padding: '4px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid var(--md-sys-color-outline, #79747E)',
                                                    color: 'var(--md-sys-color-on-surface-variant)'
                                                }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
