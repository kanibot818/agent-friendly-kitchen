import featureMapJson from "./feature-map.generated.json";
import {
  featureMapSummaryLabel,
  listFeatureMapEntries,
} from "./featureMapLogic";
import type { FeatureMapDocument } from "./featureMapTypes";

const featureMap = featureMapJson as FeatureMapDocument;

export function FeatureMapView() {
  const entries = listFeatureMapEntries(featureMap);
  const summary = featureMapSummaryLabel(featureMap);

  return (
    <section data-testid="feature-map-root" className="feature-map card">
      <h2 data-testid="feature-map-title">Feature Map</h2>
      <p data-testid="feature-map-summary" className="text-muted">
        {summary}
      </p>
      <ul data-testid="feature-map-list" className="feature-map-list">
        {entries.map((entry) => (
          <li
            key={entry.id}
            data-testid={`feature-map-entry-${entry.id}`}
            className="feature-map-entry"
          >
            <p className="feature-map-entry-id text-strong">{entry.id}</p>
            <p className="feature-map-entry-path text-muted">{entry.path}</p>
            <ul className="feature-map-testids">
              {entry.testids.map((testid) => (
                <li
                  key={testid}
                  data-testid={`feature-map-testid-${testid}`}
                  className="feature-map-testid"
                >
                  {testid}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
