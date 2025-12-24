/**
 * Mock data for Custom Modules V2
 * This will be replaced with actual API calls once the backend is ready
 */

export const mockModulesResponse = {
  modules: [
    {
      module_id: "diet-plan-001",
      name: "Diet",
      heading: "Patient Diet Plans",
      version: "v1",
      userId: "user-123",
      origin_id: "origin-001",
      creator_name: "Amelia Hartwell",
      is_owner: true,
      printConfig: {
        format: "inline",
        isEnabled: "true",
        nameOverride: "Diet Plan",
      },
      templates: [
        {
          template_id: "template-001",
          template_name: "Standard Diet",
          content: [
            {
              title: "Breakfast",
              notes: "Oatmeal with fruits",
            },
            {
              title: "Lunch",
              notes: "Grilled chicken salad",
            },
          ],
        },
      ],
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
    {
      module_id: "nutritional-strategy-001",
      name: "Nutritional Strategy",
      heading: "Nutritional Strategies",
      version: "v2",
      userId: "user-456",
      origin_id: "origin-002",
      creator_name: "Oliver Finch",
      is_owner: false,
      namedFields: [
        {
          fieldName: "NutritionType",
          fieldLabel: "Nutrition Type",
          fieldType: "string",
          isRequired: true,
          order: 0,
        },
        {
          fieldName: "Duration",
          fieldLabel: "Duration (days)",
          fieldType: "number",
          isRequired: false,
          order: 1,
        },
        {
          fieldName: "Adherence",
          fieldLabel: "Adherence Level",
          fieldType: "string",
          isRequired: false,
          order: 2,
        },
      ],
      printConfig: {
        format: "inline",
        isEnabled: "true",
      },
      created_at: "2024-01-02T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
    },
    {
      module_id: "ortho-knee-exam-001",
      name: "Ortho_Knee_Exam",
      heading: "Orthopedic Knee Examination",
      version: "v2",
      userId: "user-789",
      origin_id: "origin-003",
      creator_name: "Clara Voss",
      is_owner: false,
      namedFields: [
        {
          fieldName: "RangeOfMotion",
          fieldLabel: "Range of Motion",
          fieldType: "string",
          isRequired: true,
          order: 0,
        },
        {
          fieldName: "Stability",
          fieldLabel: "Stability Assessment",
          fieldType: "string",
          isRequired: false,
          order: 1,
        },
      ],
      printConfig: {
        format: "inline",
        isEnabled: "true",
      },
      created_at: "2024-01-03T00:00:00Z",
      updated_at: "2024-01-03T00:00:00Z",
    },
    {
      module_id: "dental-procedures-001",
      name: "Dental Procedures",
      heading: "Dental Procedures",
      version: "v1",
      userId: "user-101",
      origin_id: "origin-004",
      creator_name: "Ethan Caldwell",
      is_owner: true,
      printConfig: {
        format: "inline",
        isEnabled: "true",
      },
      templates: [
        {
          template_id: "template-dental-001",
          template_name: "Standard Procedure",
          content: [
            {
              title: "Procedure Type",
              notes: "Cleaning and examination",
            },
          ],
        },
      ],
      created_at: "2024-01-04T00:00:00Z",
      updated_at: "2024-01-04T00:00:00Z",
    },
    {
      module_id: "ent-procedures-001",
      name: "ENT Procedures",
      heading: "ENT Procedures",
      version: "v2",
      userId: "user-202",
      origin_id: "origin-005",
      creator_name: "Sophia Langley",
      is_owner: false,
      namedFields: [
        {
          fieldName: "ProcedureType",
          fieldLabel: "Procedure Type",
          fieldType: "string",
          isRequired: true,
          order: 0,
        },
        {
          fieldName: "Findings",
          fieldLabel: "Findings",
          fieldType: "text",
          isRequired: false,
          order: 1,
        },
        {
          fieldName: "Recommendations",
          fieldLabel: "Recommendations",
          fieldType: "text",
          isRequired: false,
          order: 2,
        },
      ],
      printConfig: {
        format: "inline",
        isEnabled: "true",
      },
      created_at: "2024-01-05T00:00:00Z",
      updated_at: "2024-01-05T00:00:00Z",
    },
    {
      module_id: "child-vaccination-001",
      name: "Child Vaccination Data",
      heading: "Child Vaccination Records",
      version: "v2",
      userId: "user-303",
      origin_id: "origin-006",
      creator_name: "Lucas Merritt",
      is_owner: false,
      namedFields: [
        {
          fieldName: "VaccineName",
          fieldLabel: "Vaccine Name",
          fieldType: "string",
          isRequired: true,
          order: 0,
        },
        {
          fieldName: "Date",
          fieldLabel: "Date",
          fieldType: "date",
          isRequired: true,
          order: 1,
        },
        {
          fieldName: "Dose",
          fieldLabel: "Dose Number",
          fieldType: "number",
          isRequired: false,
          order: 2,
        },
        {
          fieldName: "Notes",
          fieldLabel: "Additional Notes",
          fieldType: "text",
          isRequired: false,
          order: 3,
        },
      ],
      printConfig: {
        format: "inline",
        isEnabled: "true",
      },
      created_at: "2024-01-06T00:00:00Z",
      updated_at: "2024-01-06T00:00:00Z",
    },
    {
      module_id: "geriatric-needs-001",
      name: "Geriatric_Needs",
      heading: "Geriatric Care Needs",
      version: "v2",
      userId: "user-404",
      origin_id: "origin-007",
      creator_name: "Mia Thornton",
      is_owner: false,
      namedFields: [
        {
          fieldName: "CareType",
          fieldLabel: "Care Type",
          fieldType: "string",
          isRequired: true,
          order: 0,
        },
        {
          fieldName: "Frequency",
          fieldLabel: "Frequency",
          fieldType: "string",
          isRequired: false,
          order: 1,
        },
        {
          fieldName: "SpecialInstructions",
          fieldLabel: "Special Instructions",
          fieldType: "text",
          isRequired: false,
          order: 2,
        },
      ],
      printConfig: {
        format: "inline",
        isEnabled: "true",
      },
      created_at: "2024-01-07T00:00:00Z",
      updated_at: "2024-01-07T00:00:00Z",
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 5,
    totalCount: 100,
    limit: 20,
    hasNextPage: true,
    hasPrevPage: false,
  },
};

/**
 * Get mock modules (simulates API call)
 * @returns {Promise} Resolves with modules response
 */
export const getMockModules = () => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockModulesResponse);
    }, 300);
  });
};
