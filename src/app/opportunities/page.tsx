"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { opportunities } from "@/data/opportunities";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function OpportunitiesPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
      <main
        style={{
          padding: "2rem 24px",
          maxWidth: "1200px",
          margin: "0 auto",
          minHeight: "100vh",
        }}
      >
        <header style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "1rem",
              color: "var(--md-sys-color-primary)",
            }}
          >
            Explore Opportunities
          </h1>
          <p
            style={{
              color: "var(--md-sys-color-on-surface-variant)",
              fontSize: "1.1rem",
            }}
          >
            Find the perfect project or internship to kickstart your career.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2rem",
          }}
        >
          {opportunities.map((opp) => (
            <motion.div
              layoutId={opp.id}
              key={opp.id}
              onClick={() => setSelectedId(opp.id)}
              style={{ cursor: "pointer", height: "100%" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                variant="elevated"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      backgroundColor:
                        opp.type === "Internship"
                          ? "var(--md-sys-color-tertiary-container)"
                          : "var(--md-sys-color-primary-container)",
                      color:
                        opp.type === "Internship"
                          ? "var(--md-sys-color-on-tertiary-container)"
                          : "var(--md-sys-color-on-primary-container)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {opp.type}
                  </span>
                  <motion.h2
                    style={{
                      fontSize: "1.25rem",
                      marginBottom: "0.5rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {opp.title}
                  </motion.h2>
                  <motion.p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--md-sys-color-secondary)",
                      fontWeight: 500,
                    }}
                  >
                    {opp.organization}
                  </motion.p>
                </div>

                <motion.p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                    marginBottom: "1.5rem",
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {opp.description}
                </motion.p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {opp.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: "0.75rem",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        border:
                          "1px solid var(--md-sys-color-outline, #79747E)",
                        color: "var(--md-sys-color-on-surface-variant)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {opp.skills.length > 3 && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "2px 8px",
                        color: "var(--md-sys-color-secondary)",
                      }}
                    >
                      +{opp.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--md-sys-color-secondary)",
                    }}
                  >
                    Deadline: {opp.deadline}
                  </span>
                  <Button
                    variant="glass"
                    style={{
                      pointerEvents: "auto",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    Read More
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                  zIndex: 40,
                }}
              />
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 50,
                  pointerEvents: "none",
                }}
              >
                {opportunities
                  .filter((item) => item.id === selectedId)
                  .map((opp) => (
                    <motion.div
                      layoutId={selectedId}
                      key={opp.id}
                      style={{
                        width: "90%",
                        maxWidth: "700px",
                        maxHeight: "85vh",
                        overflowY: "auto",
                        background: "var(--md-sys-color-surface)",
                        borderRadius: "24px",
                        padding: "2rem",
                        pointerEvents: "auto",
                        position: "relative",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <Button
                        variant="glass"
                        onClick={() => setSelectedId(null)}
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          minWidth: "auto",
                          padding: "8px",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                        }}
                      >
                        ✕
                      </Button>

                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: "16px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          backgroundColor:
                            opp.type === "Internship"
                              ? "var(--md-sys-color-tertiary-container)"
                              : "var(--md-sys-color-primary-container)",
                          color:
                            opp.type === "Internship"
                              ? "var(--md-sys-color-on-tertiary-container)"
                              : "var(--md-sys-color-on-primary-container)",
                          marginBottom: "1rem",
                        }}
                      >
                        {opp.type}
                      </span>

                      <motion.h2
                        style={{
                          fontSize: "2rem",
                          marginBottom: "0.5rem",
                          color: "var(--md-sys-color-on-surface)",
                        }}
                      >
                        {opp.title}
                      </motion.h2>
                      <motion.p
                        style={{
                          fontSize: "1.1rem",
                          color: "var(--md-sys-color-secondary)",
                          marginBottom: "2rem",
                          fontWeight: 500,
                        }}
                      >
                        {opp.organization}
                      </motion.p>

                      <motion.div style={{ marginBottom: "2rem" }}>
                        <h3
                          style={{
                            fontSize: "1.2rem",
                            marginBottom: "0.5rem",
                            fontWeight: 600,
                          }}
                        >
                          Description
                        </h3>
                        <p
                          style={{
                            lineHeight: 1.7,
                            color: "var(--md-sys-color-on-surface-variant)",
                          }}
                        >
                          {opp.description}
                        </p>
                      </motion.div>

                      <div style={{ marginBottom: "2rem" }}>
                        <h3
                          style={{
                            fontSize: "1.2rem",
                            marginBottom: "0.5rem",
                            fontWeight: 600,
                          }}
                        >
                          Required Skills
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                          }}
                        >
                          {opp.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                fontSize: "0.9rem",
                                padding: "4px 12px",
                                borderRadius: "6px",
                                border:
                                  "1px solid var(--md-sys-color-outline, #79747E)",
                                color: "var(--md-sys-color-on-surface-variant)",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingTop: "1rem",
                          borderTop:
                            "1px solid var(--md-sys-color-outline-variant)",
                        }}
                      >
                        <span
                          style={{ color: "var(--md-sys-color-secondary)" }}
                        >
                          Deadline: <strong>{opp.deadline}</strong>
                        </span>
                        <Link href={`/opportunities/${opp.id}`}>
                          <Button
                            variant="filled"
                            style={{ padding: "12px 24px", fontSize: "1rem" }}
                          >
                            Apply Now
                          </Button>
                        </Link>
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
