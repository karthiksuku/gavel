-- ============================================================
-- GAVEL SAMPLE DATA
-- Sample legislation and court decisions for demo
-- ============================================================

-- Insert sample legislation for demo
INSERT INTO AIUSER.GAVEL_DOCUMENTS (id, version_id, citation, jurisdiction, doc_type, source, doc_date, url, text, text_summary)
VALUES ('privacy-act-1988-cth', 'fed-leg-2024-001', 'Privacy Act 1988 (Cth)', 'commonwealth', 'primary_legislation', 'federal_register_legislation', DATE '1988-12-14',
'https://www.legislation.gov.au/C2004A03712/latest/text',
'An Act to make provision to protect the privacy of individuals, and for related purposes. Part I—Preliminary. 1 Short title. This Act may be cited as the Privacy Act 1988. 2 Commencement. This Act commences on the day on which it receives the Royal Assent. 3 Objects of this Act. The objects of this Act are: (a) to promote the protection of the privacy of individuals; and (b) to recognise that the protection of the privacy of individuals is balanced with the interests of entities in carrying out their functions or activities...',
'The Privacy Act 1988 establishes the legal framework for protecting personal information in Australia, including the Australian Privacy Principles (APPs) that govern how organizations collect, use, and disclose personal data.');

INSERT INTO AIUSER.GAVEL_DOCUMENTS (id, version_id, citation, jurisdiction, doc_type, source, doc_date, url, text, text_summary)
VALUES ('whs-act-2011-cth', 'fed-leg-2024-002', 'Work Health and Safety Act 2011 (Cth)', 'commonwealth', 'primary_legislation', 'federal_register_legislation', DATE '2011-11-29',
'https://www.legislation.gov.au/C2011A00137/latest/text',
'An Act to secure the health and safety of workers and workplaces. Part 1—Preliminary. Division 1—Introduction. 1 Short title. This Act may be cited as the Work Health and Safety Act 2011. 2 Commencement. This Act commences on 1 January 2012. 3 Object. The main object of this Act is to provide for a balanced and nationally consistent framework to secure the health and safety of workers and workplaces by: (a) protecting workers and other persons against harm to their health, safety and welfare...',
'The WHS Act 2011 establishes the national framework for workplace health and safety, imposing duties on persons conducting a business or undertaking (PCBUs) to ensure worker safety.');

INSERT INTO AIUSER.GAVEL_DOCUMENTS (id, version_id, citation, jurisdiction, doc_type, source, doc_date, url, text, text_summary)
VALUES ('health-records-qld', 'qld-leg-2024-001', 'Health Records (Privacy and Access) Act 1997 (Qld)', 'queensland', 'primary_legislation', 'qld_legislation', DATE '1997-07-01',
'https://www.legislation.qld.gov.au/view/html/inforce/current/act-1997-031',
'An Act to protect the privacy of individuals in relation to health information held about them by health agencies, and to provide individuals with a right of access to health information held about them. Part 1—Preliminary. 1 Short title. This Act may be cited as the Health Records (Privacy and Access) Act 1997. 2 Commencement. This Act commences on a day to be fixed by proclamation...',
'Queensland legislation governing the privacy and access to health records, establishing health privacy principles for health agencies in Queensland.');

INSERT INTO AIUSER.GAVEL_DOCUMENTS (id, version_id, citation, jurisdiction, doc_type, source, doc_date, url, text, text_summary)
VALUES ('building-work-sa', 'sa-leg-2024-001', 'Building Work Contractors Act 1995 (SA)', 'south_australia', 'primary_legislation', 'sa_legislation', DATE '1995-01-01',
'https://www.legislation.sa.gov.au/lz?path=/c/a/building%20work%20contractors%20act%201995',
'An Act to regulate building work contractors and to provide for the licensing of building work contractors. Part 1—Preliminary. 1—Short title. This Act may be cited as the Building Work Contractors Act 1995. 2—Objects of Act. The objects of this Act are: (a) to regulate persons who perform building work for others; and (b) to provide for the licensing of building work contractors...',
'South Australian legislation regulating building contractors, establishing licensing requirements and consumer protections for building work.');

INSERT INTO AIUSER.GAVEL_DOCUMENTS (id, version_id, citation, jurisdiction, doc_type, source, doc_date, url, text, text_summary)
VALUES ('whs-act-sa', 'sa-leg-2024-002', 'Work Health and Safety Act 2012 (SA)', 'south_australia', 'primary_legislation', 'sa_legislation', DATE '2012-01-01',
'https://www.legislation.sa.gov.au/lz?path=/c/a/work%20health%20and%20safety%20act%202012',
'An Act to provide for the health, safety and welfare of persons at work. Part 1—Preliminary. 1—Short title. This Act may be cited as the Work Health and Safety Act 2012. 2—Commencement. This Act comes into operation on 1 January 2013. 3—Object. The main object of this Act is to provide for a balanced framework to secure the health and safety of workers and workplaces...',
'South Australian WHS legislation providing the framework for workplace safety, largely harmonized with the national model WHS laws.');

-- Court decisions
INSERT INTO AIUSER.GAVEL_DOCUMENTS (id, version_id, citation, jurisdiction, doc_type, source, doc_date, url, text, text_summary)
VALUES ('mabo-v-qld-1992', 'hca-1992-175', 'Mabo v Queensland (No 2) [1992] HCA 23', 'commonwealth', 'decision', 'high_court', DATE '1992-06-03',
'https://www.austlii.edu.au/cgi-bin/viewdoc/au/cases/cth/HCA/1992/23.html',
'HIGH COURT OF AUSTRALIA. MABO AND OTHERS v. STATE OF QUEENSLAND (No. 2). [1992] HCA 23; (1992) 175 CLR 1. Constitutional Law - Native title - Recognition at common law - Whether native title survived British sovereignty - Whether native title extinguished by Crown grant...',
'Landmark High Court decision recognizing native title rights of Aboriginal and Torres Strait Islander peoples, overturning the doctrine of terra nullius.');

COMMIT;
