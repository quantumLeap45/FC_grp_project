import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface Park {
  id: string;
  name: string;
  overview: string;
  difficulty: string;
  duration: string;
  hours: string;
  amenities: string[];
  transport: {
    mrt: string;
    bus: string;
    car: string;
  };
  scenic: string[];
}

interface PrintableGuideProps {
  park: Park;
}

export default function PrintableGuide({ park }: PrintableGuideProps) {
  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${park.name} - Trail Guide</title>
        <style>
          @page { margin: 2cm; }
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #1F2937;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #2E7D32;
            border-bottom: 3px solid #A8D5A2;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          h2 {
            color: #2E7D32;
            margin-top: 25px;
            margin-bottom: 10px;
          }
          .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            background: #F5E8D0;
            color: #1F2937;
            margin-right: 10px;
          }
          .info-section {
            background: #F9FAFB;
            padding: 15px;
            border-left: 4px solid #A8D5A2;
            margin-bottom: 15px;
          }
          ul {
            margin: 5px 0;
            padding-left: 25px;
          }
          li {
            margin: 5px 0;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #E5E7EB;
            text-align: center;
            font-size: 12px;
            color: #6B7280;
          }
        </style>
      </head>
      <body>
        <h1>${park.name} - Trail Guide</h1>
        
        <div class="info-section">
          <p><strong>Overview:</strong> ${park.overview}</p>
          <p>
            <span class="badge">Difficulty: ${park.difficulty}</span>
            <span class="badge">Duration: ${park.duration}</span>
          </p>
          <p><strong>Operating Hours:</strong> ${park.hours}</p>
        </div>

        <h2>Getting There</h2>
        <div class="info-section">
          <p><strong>🚇 MRT:</strong> ${park.transport.mrt}</p>
          <p><strong>🚌 Bus:</strong> ${park.transport.bus}</p>
          <p><strong>🚗 Car:</strong> ${park.transport.car}</p>
        </div>

        <h2>Amenities</h2>
        <ul>
          ${park.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
        </ul>

        <h2>Scenic Highlights</h2>
        <ul>
          ${park.scenic.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>

        <div class="footer">
          <p>Exploring Singapore's Green Gems</p>
          <p>Information sourced from NParks Singapore</p>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      size="sm"
      className="gap-2"
      data-testid={`button-print-guide-${park.id}`}
    >
      <FileDown className="w-4 h-4" />
      Download PDF Guide
    </Button>
  );
}
