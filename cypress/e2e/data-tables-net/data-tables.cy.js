describe('Data Tables Information Test Suite', () => {
    beforeEach(() => {
        cy.visit('');
        cy.get('select#dt-length-0').select('100'); // Ensure all rows are visible
    });

    it('Verify All Employee Details Row-by-Row', () => {
        cy.url().should('include', 'datatables.net');

        cy.readFile('cypress/fixtures/data-table.json').then((dataTable) => {
            cy.get('table#example tbody tr').each(($row, index) => {
                const data = dataTable[index]; // Match row index to JSON data

                // Verify each cell in the row matches expected data
                cy.wrap($row).within(() => {
                    cy.get('td').eq(0).should('contain.text', data.name);
                    cy.get('td').eq(1).should('contain.text', data.position);
                    cy.get('td').eq(2).should('contain.text', data.office);
                    cy.get('td').eq(3).should('contain.text', data.age);
                    cy.get('td').eq(4).should('contain.text', data.startDate);
                    cy.get('td').eq(5).should('contain.text', data.salary);
                });
            });
        });
    });
});

describe('Entries Per Page Test Suite', () => {
    beforeEach(() => {
        cy.visit('');
    });

    const entriesPerPageOptions = [
        { option: '10', expectedResults: 10 },
        { option: '25', expectedResults: 25 },
        { option: '50', expectedResults: 50 },
        { option: '100', expectedResults: 57 } // Edge case: only 57 rows exist
    ];

    entriesPerPageOptions.forEach(({ option, expectedResults }) => {
        it(`Verify table displays ${expectedResults} rows when '${option}' is selected`, () => {
            cy.get('select#dt-length-0').select(option); // Select entries per page

            // Verify row count matches expected results
            cy.get('table#example tbody tr').should('have.length', expectedResults);
        });
    });
});

describe('Data Table Search Functionality Tests', () => {
    beforeEach(() => {
        cy.visit('');
        cy.url().should('include', 'datatables.net');
        cy.get('select.dt-input').should('not.be.disabled').and('be.visible').select('100');
    });

    it('Ensure Search Bar is Enabled', () => {
        cy.get('#dt-search-0').should('be.visible').and('not.be.disabled');
    });

    it('Search by Full Name', () => {
        cy.get('#dt-search-0').type('Airi Satou');  // Input search term
        cy.get('table#example tbody tr').should('have.length', 1); // Expect only one matching row
        cy.get('table#example tbody').contains('td', 'Airi Satou').should('be.visible');
    });

    it('Search by Partial Name', () => {
        cy.get('#dt-search-0').type('Satou');  
        cy.get('table#example tbody').contains('td', 'Airi Satou').should('be.visible');
    });

    it('Search by Salary', () => {
        cy.get('#dt-search-0').type('$162,700');
        cy.get('table#example tbody').contains('td', '$162,700').should('be.visible');
    });

    it('Search by Start Date', () => {
        cy.get('#dt-search-0').type('10/9/2009');
        cy.get('table#example tbody').contains('td', 'Angelica Ramos').should('be.visible');
    });

    it('Case Sensitivity Check', () => {
        cy.get('#dt-search-0').type('airi satou');
        cy.get('table#example tbody tr').should('have.length', 1); // Expect only one matching row
        cy.get('table#example tbody').contains('td', 'Airi Satou').should('be.visible');
    });

    it('Invalid Search', () => {
        cy.get('#dt-search-0').type('XYZ123');
        cy.get('table#example tbody tr')
            .should('have.length', 1)
            .children()
            .should('have.text', 'No matching records found'); // No results should be found
    });

    it('Whitespace Handling', () => {
        cy.get('#dt-search-0').type('  Airi Satou  ');
        cy.get('table#example tbody tr').should('have.length', 1);
    });

    

});

describe('Search Bar Functionality - Testing Job Results', () => {
    beforeEach(() => {
        cy.visit('');
        cy.url().should('include', 'datatables.net');
        cy.get('select.dt-input').should('not.be.disabled').and('be.visible').select('100');
    });

    const jobList = [
        "Software Engineer",
        "Accountant",
        "Chief Executive Officer (CEO)",
        "Integration Specialist",
        "Sales Assistant",
        "Senior Javascript Developer",
        "Chief Financial Officer (CFO)",
        "Data Coordinator",
        "Developer",
        "Development Lead",
        "Director",
        "Junior Technical Author",
        "Pre-Sales Support",
        "Regional Director",
        "Javascript Developer",
        "Personnel Lead",
        "Customer Support",
        "Systems Administrator",
        "Senior Marketing Designer",
        "Secretary",
        "Office Manager",
        "Technical Author",
        "Support Lead",
        "Regional Marketing",
        "Support Engineer",
        "Marketing Designer",
        "Financial Controller",
        "Chief Marketing Officer (CMO)"
    ];

    jobList.forEach((jobTitle) => {
        it(`Verify search results for job: ${jobTitle}`, () => {
            cy.get('#dt-search-0').type(jobTitle);
    
            cy.get('table#example tbody tr').each(($row) => {
                cy.wrap($row).within(() => {
                    cy.get('td').eq(1).should('contain.text', jobTitle); // Verify job title is correct
                });
            });
        });
    });
});

describe('Search Bar Functionality - Testing Office Results', () => {
    beforeEach(() => {
        cy.visit('');
        cy.url().should('include', 'datatables.net');
        cy.get('select.dt-input').should('not.be.disabled').and('be.visible').select('100');
    });

    const officeResults = [
        { office: "London", results: 12 },
        { office: "New York", results: 11 },
        { office: "San Francisco", results: 14 },
        { office: "Tokyo", results: 5 },
        { office: "Edinburgh", results: 9 },
        { office: "Singapore", results: 4 },
        { office: "Sydney", results: 2 }
    ];

    officeResults.forEach((data) => {
        it(`Verify search results for office location: ${data.office}`, () => {
            cy.get('#dt-search-0').type(data.office);
            cy.get('table#example tbody tr').should('have.length', data.results);
        });
    });
});

describe('Boundary Value Analysis (BVA) - Data Table Test Suite', () => {
    beforeEach(() => {
        cy.visit('');
        cy.url().should('include', 'datatables.net');
        cy.get('select.dt-input').should('not.be.disabled').and('be.visible').select('100');
    });

    it('Verify youngest and oldest employee age', () => {
        cy.get('#dt-search-0').type('19'); // Youngest
        cy.get('table#example tbody').contains('td', 'Tatyana Fitzpatrick').should('be.visible');

        cy.get('#dt-search-0').clear().type('66'); // Oldest
        cy.get('table#example tbody').contains('td', 'Ashton Cox').should('be.visible');
        cy.get('table#example tbody').contains('td', 'Michael Silva').should('be.visible');
    });

    it('Verify lowest and highest salaries', () => {
        cy.get('#dt-search-0').type('$75,650'); // Lowest salary
        cy.get('table#example tbody').contains('td', 'Jennifer Acosta').should('be.visible');

        cy.get('#dt-search-0').clear().type('$1,200,000'); // Highest salary
        cy.get('table#example tbody').contains('td', 'Angelica Ramos').should('be.visible');
    });

    it('Verify earliest and latest hiring dates', () => {
        cy.get('#dt-search-0').type('10/16/2008'); // Earliest
        cy.get('table#example tbody').contains('td', 'Charde Marshall').should('be.visible');

        cy.get('#dt-search-0').clear().type('8/11/2013'); // Latest
        cy.get('table#example tbody').contains('td', 'Thor Walton').should('be.visible');
    });

    it('Verify Entries Per Page Selection', () => {
        cy.get('select#dt-length-0').select('10');
        cy.get('table#example tbody tr').should('have.length', 10);

        cy.get('select#dt-length-0').select('100');
        cy.get('table#example tbody tr').should('have.length', 57); // Edge case handling
    });
});

describe('Verify Sorting Functionality for Names', () => {
    beforeEach(() => {
        cy.visit('');
    });

    it('Verify names sorted in ascending order', () => {
        cy.get('table#example tbody tr').then(($rows) => {
            let tableNames = [];
    
            // Extract all names while trimming extra spaces
            $rows.each((index, row) => {
                const name = Cypress.$(row).find('td').eq(0).text().trim(); // Trim to avoid spacing issues
                tableNames.push(name);
            });
    
            const sortedNames = [...tableNames].sort(); // Create a sorted copy of names
    
            // Compare original order vs sorted order
            expect(tableNames).to.deep.equal(sortedNames);
        });
    });

    it('Verify names sorted in descending order', () => {
        cy.get('th').contains('Name').click(); // Click twice to sort descending
    
        cy.get('table#example tbody tr').then(($rows) => {
            let tableNames = [];
    
            // Extract all names while trimming extra spaces
            $rows.each((index, row) => {
                const name = Cypress.$(row).find('td').eq(0).text().trim();
                tableNames.push(name);
            });
    
            const sortedNames = [...tableNames].sort().reverse(); // Reverse sorted order
    
            // Compare original order vs reversed sorted order
            expect(tableNames).to.deep.equal(sortedNames);
        });
    });
});
