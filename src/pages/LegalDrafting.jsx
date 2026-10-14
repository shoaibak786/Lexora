import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Brain,
    Check,
    ChevronDown,
    Copy,
    Download,
    FileCheck2,
    FileText,
    FileType2,
    Gavel,
    History,
    Info,
    Loader2,
    Save,
    Sparkles,
    Wand2,
} from "lucide-react";

import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const LegalDrafting = () => {
    const { id } = useParams();

    const [draftType, setDraftType] = useState("Legal Notice");
    const [instructions, setInstructions] = useState(
        "Prepare a professional legal notice regarding the property ownership dispute. Clearly explain the client's position, reference the available agreement and supporting evidence, and request appropriate legal action."
    );

    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [showSources, setShowSources] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [exporting, setExporting] = useState(null);
    const [exportMessage, setExportMessage] = useState("");

    // Export dropdown positioning
    const exportButtonRef = useRef(null);

    const [exportMenuPosition, setExportMenuPosition] = useState({
        top: 0,
        left: 0,
    });

    // =========================
    // CURRENT CASE
    // =========================

    const caseId = id || "CASE-2026-001";

    const caseData = {
        "CASE-2026-001": {
            client: "Ahmed Raza",
            type: "Civil Litigation",
        },
        "CASE-2026-002": {
            client: "Sana Malik",
            type: "Contract Dispute",
        },
        "CASE-2026-003": {
            client: "Usman Tariq",
            type: "Property Dispute",
        },
        "CASE-2026-004": {
            client: "Ayesha Khan",
            type: "Family Law",
        },
        "CASE-2026-005": {
            client: "Bilal Ahmed",
            type: "Criminal Defense",
        },
        "CASE-2026-006": {
            client: "Hira Shah",
            type: "Employment Dispute",
        },
        "CASE-2026-007": {
            client: "Hamza Ali",
            type: "Corporate Law",
        },
    };

    const currentCase =
        caseData[caseId] || caseData["CASE-2026-001"];

    const caseInfo = {
        id: caseId,
        client: currentCase.client,
        type: currentCase.type,
        status: "Active",
        documents: 12,
        coverage: 84,
    };

    const draftTypes = [
        {
            name: "Legal Notice",
            description: "Formal notice to the opposing party",
        },
        {
            name: "Petition",
            description: "Court petition based on case facts",
        },
        {
            name: "Case Summary",
            description: "Structured summary of the case",
        },
        {
            name: "Written Statement",
            description: "Formal response to the opposing claim",
        },
    ];

    const sources = [
        {
            name: "Property_Agreement.pdf",
            pages: "Page 4",
            relevance: "96%",
        },
        {
            name: "Legal_Notice.pdf",
            pages: "Page 2",
            relevance: "91%",
        },
        {
            name: "Evidence_Report.docx",
            pages: "Page 7",
            relevance: "87%",
        },
        {
            name: "Court_Order.pdf",
            pages: "Page 3",
            relevance: "82%",
        },
    ];

    // =========================
    // EXPORT DROPDOWN POSITION
    // =========================

    const updateExportMenuPosition = () => {
        const button = exportButtonRef.current;

        if (!button) return;

        const rect = button.getBoundingClientRect();

        const menuWidth = 208;
        const gap = 8;
        const screenPadding = 8;

        let left = rect.right - menuWidth;

        // Keep dropdown inside viewport horizontally
        left = Math.max(left, screenPadding);
        left = Math.min(
            left,
            window.innerWidth - menuWidth - screenPadding
        );

        setExportMenuPosition({
            top: rect.bottom + gap,
            left,
        });
    };

    useEffect(() => {
        if (!showExportMenu) return;

        // Position immediately after menu opens
        updateExportMenuPosition();

        const handlePositionUpdate = () => {
            updateExportMenuPosition();
        };

        window.addEventListener("resize", handlePositionUpdate);
        window.addEventListener("scroll", handlePositionUpdate, true);

        return () => {
            window.removeEventListener("resize", handlePositionUpdate);
            window.removeEventListener("scroll", handlePositionUpdate, true);
        };
    }, [showExportMenu]);

    const generatedDraft = useMemo(() => {
        if (draftType === "Petition") {
            return `IN THE COURT OF COMPETENT JURISDICTION

PETITION

Case Reference: ${caseInfo.id}

IN THE MATTER OF:

${caseInfo.client}
...Petitioner

VERSUS

The Opposing Party
...Respondent


RESPECTFULLY SHOWETH:

1. That the Petitioner, ${caseInfo.client}, is asserting a lawful interest in the property forming the subject matter of the present dispute.

2. That the Petitioner relies upon the available property agreement and supporting documentary evidence concerning ownership and possession.

3. That the documents presently available indicate a consistent factual basis supporting the Petitioner's position.

4. That a dispute has arisen concerning the ownership and possession of the property, requiring appropriate legal determination.

5. That the Petitioner seeks protection of his lawful rights and requests that the matter be considered in light of the documentary evidence available on record.

PRAYER:

In view of the facts and circumstances stated above, it is respectfully requested that this Honourable Court may be pleased to grant appropriate relief in accordance with law and protect the lawful rights of the Petitioner.

Any other relief deemed appropriate may also kindly be granted.

Petitioner:
${caseInfo.client}

Case Reference:
${caseInfo.id}`;
        }

        if (draftType === "Case Summary") {
            return `CASE SUMMARY

Case ID: ${caseInfo.id}
Client: ${caseInfo.client}
Case Type: ${caseInfo.type}
Status: ${caseInfo.status}


1. CASE OVERVIEW

The matter concerns a property ownership and possession dispute. The client, ${caseInfo.client}, relies upon documentary evidence to support his position concerning the disputed property.


2. KEY FACTS

• A property agreement is available within the indexed case documents.
• A legal notice was issued in connection with the dispute.
• An evidence report provides additional supporting information.
• A court order is available within the case document collection.


3. PRIMARY LEGAL ISSUES

• Validity of the client's ownership claim.
• Dispute concerning possession of the property.
• Sufficiency and consistency of documentary evidence.


4. EVIDENCE

The currently indexed documents provide a meaningful evidentiary foundation. The Property Agreement has the highest retrieval relevance, followed by the Legal Notice and Evidence Report.


5. IDENTIFIED RISKS

Further verification of the complete ownership chain may be required. Additional information concerning possession history and supporting witnesses may also strengthen the case.


6. RECOMMENDED NEXT STEPS

• Verify the complete chain of ownership documents.
• Review the opposing party's evidence.
• Cross-reference all important dates.
• Upload additional supporting evidence where available.`;
        }

        if (draftType === "Written Statement") {
            return `WRITTEN STATEMENT

Case Reference: ${caseInfo.id}
Client: ${caseInfo.client}


PRELIMINARY STATEMENT

The Defendant respectfully submits this Written Statement in response to the claims concerning the ownership and possession of the disputed property.


RESPONSE TO THE CLAIM

1. The allegations concerning the ownership of the disputed property are denied to the extent that they are inconsistent with the documentary evidence available on record.

2. The Defendant relies upon the property agreement and other supporting documents contained within the case record.

3. The available evidence should be considered collectively when determining the factual and legal position of the parties.

4. The Defendant reserves the right to provide additional documentary and witness evidence as may become necessary.


DOCUMENTARY SUPPORT

The Defendant relies, among other documents, upon the Property Agreement, Legal Notice, Evidence Report and relevant Court Order available within the case workspace.


PRAYER

In view of the facts stated above, it is respectfully requested that the claims inconsistent with the documentary record be rejected and that appropriate relief be granted in accordance with law.


Defendant:
${caseInfo.client}

Case Reference:
${caseInfo.id}`;
        }

        return `LEGAL NOTICE

Date: October 08, 2026

To:
The Concerned Party

SUBJECT: NOTICE REGARDING PROPERTY OWNERSHIP AND POSSESSION

Dear Sir/Madam,

Under instructions from and on behalf of my client, Mr. ${caseInfo.client}, I hereby issue this legal notice concerning the ongoing dispute regarding ownership and possession of the property forming the subject matter of ${caseInfo.id}.

1. That my client asserts a lawful interest in the property and relies upon the relevant property agreement and supporting documentary evidence available within the case record.

2. That the available documents indicate a consistent factual position concerning my client's ownership claim.

3. That a dispute has arisen regarding the ownership and possession of the property, which has caused prejudice to my client's lawful interests.

4. That my client has maintained the position supported by the documentary record and reserves all rights available under applicable law.

5. You are therefore called upon to acknowledge and address my client's lawful position and refrain from taking any action inconsistent with the rights established by the available documentary evidence.

6. You are further requested to resolve the matter appropriately within a reasonable period from receipt of this notice, failing which my client shall be entitled to pursue such legal remedies as may be available under law.

This notice is issued without prejudice to all other rights and remedies available to my client.

Sincerely,

Legal Representative
For and on behalf of
${caseInfo.client}

Case Reference: ${caseInfo.id}`;
    }, [
        draftType,
        caseInfo.id,
        caseInfo.client,
        caseInfo.status,
        caseInfo.type,
    ]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setIsSaved(false);

        setTimeout(() => {
            setIsGenerating(false);
        }, 1800);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedDraft);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 1800);
        } catch {
            setIsCopied(false);
        }
    };

    const handleSave = () => {
        setIsSaved(true);

        setTimeout(() => {
            setIsSaved(false);
        }, 2200);
    };

    // =========================
    // PDF EXPORT
    // =========================

    const handleExportPDF = () => {
        try {
            setExporting("pdf");
            setExportMessage("");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const margin = 20;
            const contentWidth = pageWidth - margin * 2;

            let y = 22;

            // Header
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(18);
            pdf.text("LEXORA", margin, y);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8);
            pdf.setTextColor(110, 110, 110);
            pdf.text("INTELLIGENT LEGAL DRAFT", margin, y + 6);

            y += 17;

            pdf.setDrawColor(210, 210, 210);
            pdf.line(margin, y, pageWidth - margin, y);

            y += 12;

            // Document metadata
            pdf.setTextColor(40, 40, 40);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(11);
            pdf.text(draftType.toUpperCase(), margin, y);

            y += 7;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8.5);
            pdf.setTextColor(100, 100, 100);

            pdf.text(`Case ID: ${caseInfo.id}`, margin, y);
            pdf.text(`Client: ${caseInfo.client}`, margin + 75, y);

            y += 5;

            pdf.text(`Case Type: ${caseInfo.type}`, margin, y);
            pdf.text(`Status: ${caseInfo.status}`, margin + 75, y);

            y += 12;

            pdf.setDrawColor(225, 225, 225);
            pdf.line(margin, y, pageWidth - margin, y);

            y += 10;

            // Draft body
            pdf.setTextColor(35, 35, 35);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);

            const lines = pdf.splitTextToSize(generatedDraft, contentWidth);

            lines.forEach((line) => {
                if (y > pageHeight - 22) {
                    pdf.addPage();
                    y = 22;
                }

                pdf.text(line, margin, y);
                y += 5.5;
            });

            // Footer on every page
            const totalPages = pdf.internal.getNumberOfPages();

            for (let page = 1; page <= totalPages; page++) {
                pdf.setPage(page);

                pdf.setDrawColor(225, 225, 225);
                pdf.line(
                    margin,
                    pageHeight - 15,
                    pageWidth - margin,
                    pageHeight - 15
                );

                pdf.setFontSize(7);
                pdf.setTextColor(130, 130, 130);

                pdf.text("Generated by Lexora AI", margin, pageHeight - 9);

                pdf.text(
                    `Page ${page} of ${totalPages}`,
                    pageWidth - margin - 25,
                    pageHeight - 9
                );
            }

            const safeName = draftType.replace(/\s+/g, "_");

            pdf.save(`${safeName}_${caseInfo.id}.pdf`);

            setExportMessage("PDF exported successfully.");

            setTimeout(() => {
                setExportMessage("");
            }, 3000);
        } catch (error) {
            console.error(error);
            setExportMessage("Unable to export PDF.");
        } finally {
            setTimeout(() => {
                setExporting(null);
            }, 700);
        }
    };

    // =========================
    // DOCX EXPORT
    // =========================

    const handleExportDOCX = async () => {
        try {
            setExporting("docx");
            setExportMessage("");

            const draftLines = generatedDraft.split("\n");

            const paragraphs = [];

            // Lexora heading
            paragraphs.push(
                new Paragraph({
                    alignment: "center",
                    spacing: {
                        after: 120,
                    },
                    children: [
                        new TextRun({
                            text: "LEXORA",
                            bold: true,
                            size: 30,
                        }),
                    ],
                })
            );

            paragraphs.push(
                new Paragraph({
                    alignment: "center",
                    spacing: {
                        after: 300,
                    },
                    children: [
                        new TextRun({
                            text: "INTELLIGENT LEGAL DRAFT",
                            bold: true,
                            size: 16,
                            color: "666666",
                        }),
                    ],
                })
            );

            // Metadata
            paragraphs.push(
                new Paragraph({
                    spacing: {
                        after: 100,
                    },
                    children: [
                        new TextRun({
                            text: `Document Type: ${draftType}`,
                            bold: true,
                            size: 20,
                        }),
                    ],
                })
            );

            paragraphs.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Case ID: ${caseInfo.id}`,
                            size: 18,
                        }),
                    ],
                })
            );

            paragraphs.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Client: ${caseInfo.client}`,
                            size: 18,
                        }),
                    ],
                })
            );

            paragraphs.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Case Type: ${caseInfo.type}`,
                            size: 18,
                        }),
                    ],
                })
            );

            paragraphs.push(
                new Paragraph({
                    spacing: {
                        after: 300,
                    },
                    children: [
                        new TextRun({
                            text: `Status: ${caseInfo.status}`,
                            size: 18,
                        }),
                    ],
                })
            );

            // Draft content
            draftLines.forEach((line) => {
                if (!line.trim()) {
                    paragraphs.push(
                        new Paragraph({
                            spacing: {
                                after: 120,
                            },
                            children: [new TextRun({ text: "" })],
                        })
                    );

                    return;
                }

                const isHeading =
                    line === line.toUpperCase() &&
                    line.trim().length > 2 &&
                    !line.startsWith("•");

                paragraphs.push(
                    new Paragraph({
                        spacing: {
                            after: 100,
                            line: 280,
                        },
                        children: [
                            new TextRun({
                                text: line,
                                bold: isHeading,
                                size: 21,
                            }),
                        ],
                    })
                );
            });

            // Footer note
            paragraphs.push(
                new Paragraph({
                    spacing: {
                        before: 400,
                    },
                    children: [
                        new TextRun({
                            text: "Generated by Lexora AI · Case grounded",
                            italics: true,
                            size: 16,
                            color: "777777",
                        }),
                    ],
                })
            );

            const doc = new Document({
                creator: "Lexora",
                title: `${draftType} - ${caseInfo.id}`,
                description: "AI-assisted legal draft generated by Lexora.",
                sections: [
                    {
                        properties: {
                            page: {
                                margin: {
                                    top: 1000,
                                    right: 1000,
                                    bottom: 1000,
                                    left: 1000,
                                },
                            },
                        },
                        children: paragraphs,
                    },
                ],
            });

            const blob = await Packer.toBlob(doc);

            const safeName = draftType.replace(/\s+/g, "_");

            saveAs(blob, `${safeName}_${caseInfo.id}.docx`);

            setExportMessage("DOCX exported successfully.");

            setTimeout(() => {
                setExportMessage("");
            }, 3000);
        } catch (error) {
            console.error(error);
            setExportMessage("Unable to export DOCX.");
        } finally {
            setTimeout(() => {
                setExporting(null);
            }, 700);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* TOP HEADER */}
            <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070707]/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <Link
                            to={`/cases/${caseInfo.id}`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-white/20 hover:bg-white/[0.07]"
                        >
                            <ArrowLeft size={18} />
                        </Link>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="truncate text-lg font-semibold">
                                    Legal Drafting
                                </h1>

                                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                                    AI Powered
                                </span>
                            </div>

                            <p className="mt-0.5 truncate text-xs text-white/35">
                                {caseInfo.id} · {caseInfo.client} · {caseInfo.type}
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                        <Link
                            to={`/cases/${caseInfo.id}/analysis`}
                            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                        >
                            AI Analysis
                        </Link>

                        <Link
                            to={`/cases/${caseInfo.id}/ai`}
                            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
                        >
                            AI Workspace
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
                {/* INTRO */}
                <section className="mb-5 rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <Sparkles size={17} className="text-emerald-300" />

                                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                                    Intelligent Legal Drafting
                                </span>
                            </div>

                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Generate drafts from your case intelligence.
                            </h2>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                                Lexora uses the current case context, indexed documents and
                                AI-generated analysis to prepare a structured legal draft.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                                <Brain size={17} />
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                                    AI Context
                                </p>

                                <p className="mt-1 text-sm font-medium text-white/75">
                                    {caseInfo.documents} documents · {caseInfo.coverage}% coverage
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WORKSPACE */}
                <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)_300px]">
                    {/* LEFT PANEL */}
                    <aside className="space-y-5">
                        {/* DRAFT TYPE */}
                        <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-white/60">
                                    <FileText size={17} />
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                                        Step 01
                                    </p>
                                    <h3 className="text-sm font-semibold">Draft type</h3>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {draftTypes.map((item) => {
                                    const active = draftType === item.name;

                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => setDraftType(item.name)}
                                            className={`w-full rounded-xl border p-3 text-left transition ${
                                                active
                                                    ? "border-white/20 bg-white text-black"
                                                    : "border-white/10 bg-white/[0.02] text-white hover:border-white/20 hover:bg-white/[0.05]"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-sm font-semibold">
                                                    {item.name}
                                                </span>

                                                {active && <Check size={16} />}
                                            </div>

                                            <p
                                                className={`mt-1 text-xs ${
                                                    active ? "text-black/55" : "text-white/35"
                                                }`}
                                            >
                                                {item.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* INSTRUCTIONS */}
                        <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-white/60">
                                    <Wand2 size={17} />
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                                        Step 02
                                    </p>
                                    <h3 className="text-sm font-semibold">Instructions</h3>
                                </div>
                            </div>

                            <textarea
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                rows={9}
                                placeholder="Tell Lexora what you want in the draft..."
                                className="w-full resize-none rounded-xl border border-white/10 bg-[#070707] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-white/25"
                            />

                            <p className="mt-2 text-[11px] leading-5 text-white/25">
                                Add specific instructions, facts or requirements for the
                                generated document.
                            </p>
                        </section>

                        {/* CASE CONTEXT */}
                        <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-white/60">
                                    <Gavel size={17} />
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                                        Case context
                                    </p>
                                    <h3 className="text-sm font-semibold">Active case</h3>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <ContextRow label="Case ID" value={caseInfo.id} />
                                <ContextRow label="Client" value={caseInfo.client} />
                                <ContextRow label="Type" value={caseInfo.type} />
                                <ContextRow
                                    label="Documents"
                                    value={`${caseInfo.documents} indexed`}
                                />
                            </div>
                        </section>

                        {/* GENERATE BUTTON */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 size={17} className="animate-spin" />
                                    Lexora is drafting...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={17} />
                                    Generate Draft
                                </>
                            )}
                        </button>
                    </aside>

                    {/* CENTER EDITOR */}
                    <section className="min-w-0 overflow-visible rounded-2xl border border-white/10 bg-[#0b0b0b]">
                        {/* EDITOR HEADER */}
                        <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                            <div>
                                <div className="flex items-center gap-2">
                                    <FileCheck2 size={17} className="text-emerald-300" />
                                    <h3 className="font-semibold">Draft Preview</h3>
                                </div>

                                <p className="mt-1 text-xs text-white/30">
                                    AI generated · {draftType}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {/* COPY */}
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                    {isCopied ? "Copied" : "Copy"}
                                </button>

                                {/* SAVE DRAFT */}
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                    {isSaved ? <Check size={14} /> : <Save size={14} />}
                                    {isSaved ? "Saved" : "Save Draft"}
                                </button>

                                {/* EXPORT */}
                                <div className="relative shrink-0">
                                    <button
                                        ref={exportButtonRef}
                                        onClick={() => {
                                            if (showExportMenu) {
                                                setShowExportMenu(false);
                                            } else {
                                                updateExportMenuPosition();
                                                setShowExportMenu(true);
                                            }
                                        }}
                                        className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
                                    >
                                        <Download size={14} />
                                        Export

                                        <ChevronDown
                                            size={13}
                                            className={`transition ${
                                                showExportMenu ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* EXPORT DROPDOWN */}
                        {showExportMenu &&
                            createPortal(
                                <div
                                    className="fixed z-[99999] w-52 overflow-hidden rounded-xl border border-white/10 bg-[#111111] p-1.5 shadow-2xl shadow-black/50"
                                    style={{
                                        top: `${exportMenuPosition.top}px`,
                                        left: `${exportMenuPosition.left}px`,
                                    }}
                                >
                                    <button
                                        onClick={() => {
                                            setShowExportMenu(false);
                                            handleExportPDF();
                                        }}
                                        disabled={exporting !== null}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[0.06] disabled:opacity-50"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/10 text-red-300">
                                            {exporting === "pdf" ? (
                                                <Loader2
                                                    size={15}
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <FileType2 size={15} />
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-white/80">
                                                Export PDF
                                            </p>

                                            <p className="mt-0.5 text-[10px] text-white/30">
                                                Portable document
                                            </p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowExportMenu(false);
                                            handleExportDOCX();
                                        }}
                                        disabled={exporting !== null}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[0.06] disabled:opacity-50"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/10 text-blue-300">
                                            {exporting === "docx" ? (
                                                <Loader2
                                                    size={15}
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <FileText size={15} />
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-white/80">
                                                Export DOCX
                                            </p>

                                            <p className="mt-0.5 text-[10px] text-white/30">
                                                Editable Word file
                                            </p>
                                        </div>
                                    </button>
                                </div>,
                                document.body
                            )}

                        {/* EXPORT SUCCESS MESSAGE */}
                        {exportMessage && (
                            <div className="border-b border-emerald-400/10 bg-emerald-400/[0.04] px-5 py-3">
                                <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                                    <Check size={14} />
                                    {exportMessage}
                                </div>
                            </div>
                        )}

                        {/* DOCUMENT */}
                        <div className="max-h-[780px] overflow-y-auto p-4 sm:p-7 lg:p-10">
                            <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-[#101010] p-6 sm:p-10">
                                <div className="mb-8 border-b border-white/10 pb-6 text-center">
                                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
                                        <Gavel size={20} />
                                    </div>

                                    <h2 className="text-lg font-semibold">
                                        Lexora Legal Draft
                                    </h2>

                                    <p className="mt-1 text-xs text-white/30">
                                        {draftType} · {caseInfo.id}
                                    </p>
                                </div>

                                <div className="whitespace-pre-wrap text-sm leading-7 text-white/70">
                                    {generatedDraft}
                                </div>

                                <div className="mt-10 border-t border-white/10 pt-5">
                                    <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-white/25">
                                        <span>Generated by Lexora AI</span>
                                        <span>Case grounded</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* RIGHT PANEL */}
                    <aside className="space-y-5">
                        {/* AI STATUS */}
                        <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
                            <div className="mb-5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Brain size={17} className="text-emerald-300" />
                                    <h3 className="text-sm font-semibold">AI Status</h3>
                                </div>

                                <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    Ready
                                </span>
                            </div>

                            <div className="space-y-4">
                                <StatusRow
                                    label="Case context"
                                    value="Loaded"
                                    success
                                />

                                <StatusRow
                                    label="Documents"
                                    value={`${caseInfo.documents} indexed`}
                                    success
                                />

                                <StatusRow
                                    label="Knowledge"
                                    value={`${caseInfo.coverage}%`}
                                    success
                                />

                                <StatusRow
                                    label="Grounding"
                                    value="Active"
                                    success
                                />
                            </div>
                        </section>

                        {/* SOURCES */}
                        <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
                            <button
                                onClick={() => setShowSources(!showSources)}
                                className="flex w-full items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <FileText size={17} className="text-white/55" />
                                    <h3 className="text-sm font-semibold">
                                        Source Documents
                                    </h3>
                                </div>

                                <ChevronDown
                                    size={16}
                                    className={`text-white/35 transition ${
                                        showSources ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            <p className="mt-2 text-xs leading-5 text-white/30">
                                Documents used as context for this draft.
                            </p>

                            {showSources && (
                                <div className="mt-4 space-y-2">
                                    {sources.map((source, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-white/10 bg-white/[0.025] p-3"
                                        >
                                            <div className="flex items-start gap-3">
                                                <FileText
                                                    size={15}
                                                    className="mt-0.5 shrink-0 text-white/40"
                                                />

                                                <div className="min-w-0">
                                                    <p className="truncate text-xs font-medium text-white/70">
                                                        {source.name}
                                                    </p>

                                                    <div className="mt-1 flex items-center justify-between gap-2">
                                                        <span className="text-[10px] text-white/30">
                                                            {source.pages}
                                                        </span>

                                                        <span className="text-[10px] font-medium text-emerald-300/70">
                                                            {source.relevance}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* DRAFT INFO */}
                        <section className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
                            <div className="flex items-center gap-2">
                                <Info size={17} className="text-white/45" />
                                <h3 className="text-sm font-semibold">
                                    Draft Information
                                </h3>
                            </div>

                            <div className="mt-4 space-y-3">
                                <InfoRow label="Type" value={draftType} />
                                <InfoRow label="AI Model" value="Llama 3" />
                                <InfoRow label="Grounding" value="Case documents" />
                                <InfoRow label="Status" value="Draft" />
                            </div>
                        </section>

                        {/* HISTORY */}
                        <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 text-left transition hover:bg-white/[0.03]">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-white/45">
                                <History size={16} />
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-medium">Draft History</p>

                                <p className="mt-0.5 text-xs text-white/30">
                                    View previously generated drafts
                                </p>
                            </div>

                            <ChevronDown
                                size={15}
                                className="-rotate-90 text-white/25"
                            />
                        </button>
                    </aside>
                </div>

                {/* BOTTOM NOTICE */}
                <section className="mt-5 rounded-2xl border border-amber-400/15 bg-amber-400/[0.025] p-4">
                    <div className="flex gap-3">
                        <Info
                            size={17}
                            className="mt-0.5 shrink-0 text-amber-300/70"
                        />

                        <p className="text-xs leading-5 text-white/40">
                            AI-generated drafts are intended as a drafting aid. A qualified
                            legal professional should review and verify the content,
                            applicable law, facts and citations before using any document
                            officially.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

const ContextRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
            <span className="text-xs text-white/30">{label}</span>

            <span className="max-w-[60%] truncate text-right text-xs font-medium text-white/65">
                {value}
            </span>
        </div>
    );
};

const StatusRow = ({ label, value, success }) => {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs text-white/35">{label}</span>

            <span
                className={`flex items-center gap-1.5 text-xs font-medium ${
                    success ? "text-emerald-300" : "text-white/50"
                }`}
            >
                {success && <Check size={13} />}
                {value}
            </span>
        </div>
    );
};

const InfoRow = ({ label, value }) => {
    return (
        <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-white/30">{label}</span>

            <span className="text-xs font-medium text-white/60">
                {value}
            </span>
        </div>
    );
};

export default LegalDrafting;