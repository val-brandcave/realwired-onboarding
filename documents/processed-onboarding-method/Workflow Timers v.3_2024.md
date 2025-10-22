# Workflow Timers (v3, 2024)

- **Source**: documents/current-onboarding-method/Workflow Timers v.3_2024.docx
- **Purpose**: Configure time-based notifications and escalations across request, vendor, and review workflows.

## Summary
Workflow Timers define when automated reminders/escalations are sent. After the initial notification, reminders continue daily until the underlying condition is resolved or the due date is extended. Some timers depend on routing configuration or assigned roles (e.g., Escalation Job Manager).

## Timers
- **Request Escalation Days**: Days/months before a request escalates if not accepted by the assigned Job Manager. Requires an Escalation Processor in Assigned Area. Not applicable when all requests route to a single inbox.
- **Vendor Confirmation**: Days a vendor has to confirm engagement. Sends “No Acknowledgement” reminder to Vendor and JM; no automatic rescind (JM may engage another vendor).
- **Vendor License Renewal**: Days prior to credential expiration to remind vendors. Recommended: 20 days.
- **Remind LO to Select Every**: Days between reminders to LOs to select a bid using the LO Bid Selection button.
- **Remind JM – Pending Review Solicitation**: Reminds JM when no responses to review solicitation are received.
- **Awaiting Resubmission (Awaiting LO)**: Reminds LO to resubmit after JM rejects due to insufficient information.
- **Vendor Solicitation**: Notifies JM after N days if no bids received; prompts outreach or additional solicitations.
- **Vendor Reminder**: Days before Report Due Date to remind vendor of due report.
- **Vendor Late**: Enables Past Due notifications starting next business day after Revised Report Delivery Date; repeats until upload/extension.
- **Reviewer Reminder**: Days before Review Due Date to remind reviewer; option to include 1‑Step review‑only orders.
- **Reviewer Late**: Enables Past Due notifications starting next business day after Review Due Date; repeats until completion/extension.
- **Remind Reviewer & JM – Review Assignment Not Accepted**: Days before reminding reviewer and JM to accept the review assignment.
- **Inspection Frequency**: N/A.
