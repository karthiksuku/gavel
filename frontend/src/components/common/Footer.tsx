import { Scale } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gavel-900 text-gavel-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="w-6 h-6 text-gold-400" />
              <span className="text-white font-bold">Gavel</span>
            </div>
            <p className="text-sm">
              AI-powered legal research across Australian legislation and caselaw.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Coverage</h4>
            <ul className="space-y-2 text-sm">
              <li>Commonwealth</li>
              <li>New South Wales</li>
              <li>Queensland</li>
              <li>South Australia</li>
              <li>Western Australia</li>
              <li>Tasmania</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>Semantic Search</li>
              <li>AI Legal Assistant</li>
              <li>Jurisdiction Comparison</li>
              <li>Document Analysis</li>
              <li>Compliance Checklists</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Powered By</h4>
            <ul className="space-y-2 text-sm">
              <li>Oracle Autonomous Database</li>
              <li>Grok-4 AI</li>
              <li>Vector Search</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gavel-700 mt-8 pt-6 text-center text-sm">
          <p>
            Gavel provides AI-generated legal information, not legal advice.
            Always verify with official sources and consult a qualified legal professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
