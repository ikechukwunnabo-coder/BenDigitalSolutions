export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">About Ben Digital Solutions</h1>
      <p className="mb-4 text-slate-700">Ben Digital Solutions is a digital services business focused on helping organizations present their work clearly, capture opportunities, and manage delivery more effectively.</p>
      <p className="mb-4 text-slate-700">This MVP platform supports core operations: service presentation, portfolio publishing, enquiry capture, customer and project tracking, internal notifications, and audit visibility for administrative actions.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-4"><h2 className="font-semibold">Clarity</h2><p className="text-sm text-slate-600">Clear services and credible digital presence.</p></div>
        <div className="rounded-lg border bg-white p-4"><h2 className="font-semibold">Responsiveness</h2><p className="text-sm text-slate-600">Enquiries are captured and routed for follow-up.</p></div>
        <div className="rounded-lg border bg-white p-4"><h2 className="font-semibold">Control</h2><p className="text-sm text-slate-600">Admin tools for content, leads, projects, and records.</p></div>
      </div>
    </div>
  );
}
