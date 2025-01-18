import { Opportunity } from '@/types/types';
import OpportunityCard from '@/components/repeto/OpportunityCard';
import scholarshipsData from '@/data/scholarships.json';
import hackathonsData from '@/data/hackathons.json';
import internshipsData from '@/data/internships.json';
import researchData from '@/data/research.json';
import othersData from '@/data/others.json';

interface OpportunityListProps {
  filters: Record<string, string[]>;
  activeTab: string;
}

export default function OpportunityList({ filters, activeTab }: OpportunityListProps) {
  // Combine all opportunities
  const allOpportunities = [
    ...scholarshipsData.scholarships,
    ...hackathonsData.hackathons,
    ...internshipsData.internships,
    ...researchData.research,
    ...othersData.others
  ];

  const filterOpportunities = (opportunities: Opportunity[]) => {
    return opportunities.filter(opportunity => {
      // Filter by active tab
      if (activeTab !== 'Latest' && opportunity.category !== activeTab) {
        return false;
      }

      // Apply all other filters
      for (const [key, values] of Object.entries(filters)) {
        if (values.length === 0) continue;

        switch (key.toLowerCase()) {
          case 'opportunity':
            if (values.includes('Others')) {
              // If 'Others' is selected, include opportunities that are not Internship, Research, Hackathon, or Scholarship
              const mainTypes = ['Internship', 'Research', 'Hackathon', 'Scholarship'];
              if (values.length === 1) {
                // If only 'Others' is selected
                if (mainTypes.includes(opportunity.type)) return false;
              } else {
                // If 'Others' is selected along with other types
                if (!values.includes(opportunity.type) && mainTypes.includes(opportunity.type)) return false;
              }
            } else {
              // Normal type filtering
              if (!values.includes(opportunity.type)) return false;
            }
            break;
          case 'department':
            if (!opportunity.department.some(d => values.includes(d))) return false;
            break;
          case 'course level':
            if (!opportunity.courseLevel.some(c => values.includes(c))) return false;
            break;
          case 'exclusive':
            if (values.includes('Others')) {
              // If 'Others' is selected, include opportunities that are not Men or Women exclusive
              const mainExclusives = ['Men', 'Women'];
              if (values.length === 1) {
                // If only 'Others' is selected
                if (mainExclusives.includes(opportunity.exclusive)) return false;
              } else {
                // If 'Others' is selected along with other types
                if (!values.includes(opportunity.exclusive) && mainExclusives.includes(opportunity.exclusive)) return false;
              }
            } else {
              // Normal exclusive filtering
              if (opportunity.exclusive !== 'All' && !values.includes(opportunity.exclusive)) return false;
            }
            break;
          case 'year':
            if (values.includes('others')) {
              // If 'others' is selected for year
              const mainYears = ['1st year', '2nd year', '3rd year', '4th year', '5th year'];
              if (values.length === 1) {
                // If only 'others' is selected
                if (opportunity.year.every(y => mainYears.includes(y))) return false;
              } else {
                // If 'others' is selected along with other years
                if (!opportunity.year.some(y => values.includes(y) || (values.includes('others') && !mainYears.includes(y)))) return false;
              }
            } else {
              // Normal year filtering
              if (!opportunity.year.some(y => values.includes(y))) return false;
            }
            break;
        }
      }
      return true;
    });
  };

  const filteredOpportunities = filterOpportunities(allOpportunities);

  return (
    <div className="grid grid-cols-1 gap-6">
      {filteredOpportunities.map(opportunity => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}