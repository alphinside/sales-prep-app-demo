-- Mock Leads Data for Sales Prep App Demo
-- Run this to populate the database with realistic demo data

-- Insert Leads
INSERT INTO leads (name, company, email, phone, status, value, notes) VALUES
('Sarah Chen', 'TechFlow Solutions', 'sarah.chen@techflow.io', '+1-415-555-0123', 'Qualified', 45000, 'CTO of growing SaaS startup. Interested in sales automation. Team of 15, expanding rapidly.'),
('Marcus Thompson', 'DataSync Corp', 'marcus.t@datasync.com', '+1-650-555-0198', 'Negotiation', 120000, 'VP of Sales at enterprise data company. Looking to streamline lead management for 50+ person sales team.'),
('Emily Rodriguez', 'CloudNest Inc', 'emily@cloudnest.co', '+1-408-555-0176', 'Proposal Sent', 75000, 'Head of Marketing. Needs better CRM integration. Budget approved for Q2.'),
('James Park', 'StartupLabs', 'james.park@startuplabs.io', '+1-510-555-0142', 'New', 25000, 'Founder of startup accelerator. Wants demo of lead tracking features.'),
('Aisha Mohammed', 'ScaleWorks', 'aisha@scaleworks.com', '+1-925-555-0189', 'Qualified', 85000, 'COO looking to optimize sales operations. Previously used Salesforce, seeking alternatives.'),
('David Kim', 'InnovateCo', 'd.kim@innovateco.tech', '+1-408-555-0165', 'Meeting Scheduled', 60000, 'Director of Business Development. Interested in API integrations and automation.'),
('Lisa Wang', 'GrowthMetrics', 'lisa.wang@growthmetrics.ai', '+1-415-555-0134', 'Closed Won', 95000, 'CEO of analytics startup. Signed annual contract. Great reference customer.'),
('Robert Martinez', 'FutureStack', 'robert.m@futurestack.io', '+1-650-555-0187', 'Qualified', 55000, 'Engineering Manager evaluating tools for product team. Technical buyer.'),
('Jennifer Liu', 'PipelinePro', 'jen@pipelinepro.com', '+1-510-555-0156', 'New', 40000, 'Sales Operations Manager. Came from webinar, needs follow-up.'),
('Michael Foster', 'RevBoost Technologies', 'michael@revboost.tech', '+1-408-555-0191', 'Cold', 30000, 'Inbound lead from website. No response to initial emails yet.'),
('Priya Sharma', 'CloudScale Ventures', 'priya.sharma@cloudscale.vc', '+1-415-555-0128', 'Qualified', 110000, 'Partner at VC firm. Evaluating for portfolio companies. High-value relationship.'),
('Thomas Anderson', 'DevTools Inc', 'thomas.a@devtools.com', '+1-650-555-0173', 'Proposal Sent', 65000, 'VP of Engineering. Requested custom pricing proposal last week.'),
('Nina Patel', 'SalesForce360', 'nina@salesforce360.io', '+1-925-555-0145', 'Negotiation', 140000, 'Chief Revenue Officer. In final stages of negotiation. Enterprise deal.'),
('Carlos Rivera', 'AppGrowth', 'carlos@appgrowth.co', '+1-510-555-0182', 'Meeting Scheduled', 50000, 'Product Manager. Demo scheduled for next Tuesday.'),
('Amanda Zhang', 'MetricsMatter', 'amanda.z@metricsmatter.ai', '+1-408-555-0139', 'Qualified', 70000, 'Director of Analytics. Budget cycle starts next month.');

-- Insert Meetings
INSERT INTO meetings (lead_id, title, meeting_date, notes, is_completed) VALUES
(1, 'Discovery Call', '2024-03-15 10:00:00', 'Discussed current sales process. Using spreadsheets, needs automation. Team growing from 15 to 25 by Q3.', 1),
(1, 'Technical Demo', '2024-03-22 14:00:00', 'Showed API integrations and automation features. Sarah very impressed with Gemini integration. Asked about security.', 1),
(1, 'Follow-up Meeting', '2024-04-05 11:00:00', 'Reviewing pricing options. Wants to start with Professional plan.', 0),
(2, 'Initial Consultation', '2024-02-28 15:00:00', 'Marcus explained current pain points: manual data entry, poor reporting. Needs enterprise features.', 1),
(2, 'Executive Presentation', '2024-03-18 16:00:00', 'Presented to leadership team. Strong interest in analytics dashboard and team management features.', 1),
(2, 'Contract Review', '2024-03-28 10:00:00', 'Legal team reviewing MSA. Few questions on data handling and SLA.', 0),
(3, 'Demo Session', '2024-03-20 13:00:00', 'Emily loved the email automation features. Wants integration with their existing marketing stack.', 1),
(4, 'Product Walkthrough', '2024-04-08 09:00:00', 'Scheduled demo for next week. James interested in multi-tenant features for accelerator portfolio.', 0),
(5, 'Discovery Call', '2024-03-12 11:00:00', 'Aisha currently on Salesforce but frustrated with complexity and cost. Looking for simpler alternative.', 1),
(5, 'Custom Demo', '2024-03-25 14:30:00', 'Showed migration process and training resources. Team of 30 needs onboarding plan.', 1),
(6, 'Technical Deep Dive', '2024-04-02 15:00:00', 'David asked detailed API questions. Developer-focused. Wants to build custom integrations.', 1),
(6, 'Implementation Planning', '2024-04-10 10:30:00', 'Upcoming meeting to discuss implementation timeline and resources needed.', 0),
(7, 'Kickoff Call', '2024-02-15 10:00:00', 'Lisa signed contract! Setting up onboarding schedule. Very excited about getting started.', 1),
(8, 'Evaluation Meeting', '2024-03-19 16:00:00', 'Robert comparing us with 2 other vendors. Needs technical documentation for engineering review.', 1),
(11, 'Partnership Discussion', '2024-03-08 14:00:00', 'Priya wants to recommend to 5 portfolio companies. Discussed partnership program and referral terms.', 1),
(11, 'Portfolio Review', '2024-03-29 11:00:00', 'Going through specific portfolio company needs. Potential for 5 deals.', 0),
(12, 'Proposal Review', '2024-03-26 13:00:00', 'Thomas has questions on implementation timeline and training. Proposal needs minor revisions.', 1),
(13, 'Final Negotiations', '2024-03-30 15:00:00', 'Nina negotiating on price and contract terms. Very close to closing. Enterprise tier with custom SLA.', 1),
(14, 'Product Demo', '2024-04-09 14:00:00', 'Scheduled demo next Tuesday. Carlos interested in lead scoring and pipeline features.', 0),
(15, 'Budget Planning', '2024-03-21 10:00:00', 'Amanda waiting for budget approval. Fiscal year starts May 1st. Strong interest, timing issue.', 1);

-- Insert Lead Notes (interaction history)
INSERT INTO lead_notes (lead_id, content, type) VALUES
-- Sarah Chen (TechFlow Solutions)
(1, 'Initial contact via LinkedIn. Responded quickly to connection request.', 'general'),
(1, 'Sent case study from similar SaaS company. She found it very relevant.', 'email'),
(1, 'Follow-up: Sarah mentioned they are evaluating 3 vendors. We are the frontrunner.', 'call'),
(1, 'Security questionnaire completed and submitted to their team.', 'general'),
(1, 'Requested reference call with existing customer. Connected with Lisa Wang.', 'general'),

-- Marcus Thompson (DataSync Corp)
(2, 'Inbound from Enterprise demo request form. VP level, high intent.', 'general'),
(2, 'Sent ROI calculator showing potential time savings for 50-person team.', 'email'),
(2, 'Legal reviewing contract. Asked about data residency and compliance.', 'general'),
(2, 'Marcus championing internally. CFO needs to sign off on budget.', 'call'),

-- Emily Rodriguez (CloudNest Inc)
(3, 'Met at SaaS conference in SF. Very interested in marketing automation features.', 'general'),
(3, 'Proposal sent with marketing-focused package. Emphasized email integration.', 'email'),
(3, 'Emily mentioned budget is approved, just needs final stakeholder approval.', 'call'),

-- James Park (StartupLabs)
(4, 'Referred by existing customer. Runs accelerator with 20+ portfolio companies.', 'general'),
(4, 'Interested in volume pricing for multiple companies under one account.', 'email'),

-- Aisha Mohammed (ScaleWorks)
(5, 'Coming from Salesforce. Main pain points: complexity, cost, slow support.', 'call'),
(5, 'Sent migration guide and comparison sheet vs Salesforce.', 'email'),
(5, 'Aisha very impressed with ease of use. Said "This is exactly what we need."', 'call'),
(5, 'Need to address data migration timeline - 5 years of Salesforce data.', 'general'),

-- David Kim (InnovateCo)
(6, 'Technical buyer. Asked for API documentation and developer resources.', 'email'),
(6, 'Provided sandbox environment for API testing. David is building POC.', 'general'),
(6, 'Webhook integration working well in their test environment.', 'call'),

-- Lisa Wang (GrowthMetrics) - Closed Won
(7, 'Signed annual contract! $95K ARR. Great success story.', 'general'),
(7, 'Lisa agreed to be reference customer. Very happy with product.', 'general'),
(7, 'Featured in case study. Saw 40% improvement in sales productivity.', 'general'),

-- Robert Martinez (FutureStack)
(8, 'Engineering Manager evaluating for product team use case.', 'general'),
(8, 'Sent technical architecture overview and security documentation.', 'email'),
(8, 'Robert comparing features with Monday.com and Notion. Price sensitive.', 'call'),

-- Jennifer Liu (PipelinePro)
(9, 'Attended our webinar on sales automation. Downloaded whitepaper.', 'general'),
(9, 'Sales Operations role - perfect fit. Need to schedule discovery call.', 'email'),

-- Michael Foster (RevBoost Technologies)
(10, 'Website lead - downloaded free trial but no engagement yet.', 'general'),
(10, 'Sent 3 follow-up emails. No response. Trying phone outreach next.', 'email'),

-- Priya Sharma (CloudScale Ventures)
(11, 'VC partner with portfolio access. Could lead to multiple deals.', 'general'),
(11, 'Discussed partnership program - 20% referral fee for closed deals.', 'call'),
(11, 'Priya introducing us to 5 portfolio companies next month.', 'general'),
(11, 'Set up tracking for portfolio referrals. High-value relationship.', 'general'),

-- Thomas Anderson (DevTools Inc)
(12, 'VP Engineering requested custom proposal with volume discounts.', 'general'),
(12, 'Proposal includes 50 seats + API access + priority support.', 'email'),
(12, 'Thomas needs to present to board. Provided ROI deck for his presentation.', 'general'),

-- Nina Patel (SalesForce360)
(13, 'CRO evaluating for enterprise deployment. 100+ seat deal potential.', 'general'),
(13, 'Nina negotiating on multi-year contract terms and volume pricing.', 'call'),
(13, 'Legal teams in discussion. Close to final agreement.', 'general'),
(13, 'Request for custom SLA and dedicated support. Enterprise tier.', 'email'),

-- Carlos Rivera (AppGrowth)
(14, 'Product Manager interested in lead scoring and analytics features.', 'general'),
(14, 'Demo scheduled for next Tuesday 2pm. Preparing custom demo flow.', 'email'),

-- Amanda Zhang (MetricsMatter)
(15, 'Director of Analytics. Budget cycle timing challenge.', 'general'),
(15, 'Amanda loves the product but fiscal year starts May 1. Following up then.', 'call'),
(15, 'Sent monthly newsletter to stay top of mind until budget opens.', 'email');
