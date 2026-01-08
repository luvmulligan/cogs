import { EducationalContent, EducationCategory } from '../models/business.model';

export const educationContentEN: EducationalContent[] = [
  {
    id: '1',
    title: 'Fixed Costs: What Are They and How to Identify Them?',
    category: EducationCategory.FIXED_COSTS,
    difficulty: 'beginner',
    estimatedTime: 5,
    content: `
      <h3>What are fixed costs?</h3>
      <p>Fixed costs are expenses that don't vary with your production or sales level. You must pay them regardless of how much you sell.</p>
      
      <h4>Examples of fixed costs:</h4>
      <ul>
        <li><strong>Rent:</strong> Commercial space, office, or production facility</li>
        <li><strong>Fixed salaries:</strong> Administrative staff with monthly wages</li>
        <li><strong>Utilities:</strong> Electricity, water, internet, phone</li>
        <li><strong>Insurance:</strong> Property insurance, equipment insurance, etc.</li>
        <li><strong>Licenses and permits:</strong> Business licenses, software licenses, etc.</li>
      </ul>

      <h4>Why are they important?</h4>
      <p>Fixed costs determine your <strong>break-even point</strong>: the minimum amount you need to sell to cover all your expenses. Knowing them helps you:</p>
      <ul>
        <li>Set realistic sales goals</li>
        <li>Decide if your business is viable</li>
        <li>Plan your cash flow</li>
      </ul>

      <div class="tip">
        <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Tip:</strong> List all your monthly fixed costs and add them up. That's the minimum amount your business must generate to avoid operating at a loss.
      </div>
    `
  },
  {
    id: '2',
    title: 'How to Allocate Fixed Costs Among Products',
    category: EducationCategory.FIXED_COSTS,
    difficulty: 'intermediate',
    estimatedTime: 8,
    content: `
      <h3>The Fixed Costs Challenge</h3>
      <p>Fixed costs are monthly (rent, utilities, salaries), but your products are sold by unit. How do you calculate the cost per unit?</p>
      
      <h4>Common Allocation Methods:</h4>
      <ol>
        <li><strong>By Expected Sales Volume</strong> (Recommended)
          <ul>
            <li>The most popular products absorb more fixed costs</li>
            <li>Reflects actual resource usage</li>
            <li>Easier to calculate</li>
          </ul>
        </li>
        <li><strong>Equal Distribution</strong>
          <ul>
            <li>Divide total cost by number of products</li>
            <li>Simple but not always fair</li>
            <li>Good for products with similar sales</li>
          </ul>
        </li>
        <li><strong>By Direct Cost</strong>
          <ul>
            <li>More expensive products bear more fixed costs</li>
            <li>Useful when products use different resources</li>
          </ul>
        </li>
      </ol>

      <h4>Practical Example:</h4>
      <p>Imagine a bakery with <strong>$5,000 in monthly fixed costs</strong> and 3 products:</p>
      <ul>
        <li>White bread: 1,000 units/month</li>
        <li>Sweet rolls: 500 units/month</li>
        <li>Cakes: 200 units/month</li>
      </ul>

      <p><strong>Total units:</strong> 1,700 units/month</p>
      <p><strong>Fixed cost per unit:</strong> $5,000 / 1,700 = $2.94</p>

      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 0.5rem; text-align: left; border: 1px solid #ddd;">Product</th>
            <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Units</th>
            <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Fixed Cost Allocated</th>
            <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Cost/Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">White bread</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">1,000</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$2,941</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$2.94</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Sweet rolls</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">500</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$1,471</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$2.94</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Cakes</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">200</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$588</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$2.94</td>
          </tr>
        </tbody>
      </table>

      <div class="tip">
        <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Important:</strong> Periodically review your sales estimates. If actual sales differ significantly, recalculate your prices.
      </div>
    `
  },
  {
    id: '3',
    title: 'Profit Margin: How Much Should You Earn?',
    category: EducationCategory.PROFIT_MARGIN,
    difficulty: 'beginner',
    estimatedTime: 6,
    content: `
      <h3>What is Profit Margin?</h3>
      <p>Profit margin is the percentage you add on top of your costs to generate profit. It's what your business actually earns after covering all expenses.</p>
      
      <h4>Basic Formula:</h4>
      <code style="display: block; background: #f5f5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        Selling Price = Total Cost × (1 + Margin%/100)
      </code>

      <h4>Example:</h4>
      <p>If a product costs you $10 and you want a 30% margin:</p>
      <code style="display: block; background: #f5f5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        Selling Price = $10 × 1.30 = $13
      </code>
      <p>You earn $3 per unit ($13 - $10 = $3)</p>

      <h4>Recommended Margins by Business Type:</h4>
      <ul>
        <li><strong>Essential products (bread, basic groceries):</strong> 10-25%</li>
        <li><strong>Restaurants and cafés:</strong> 60-70% (high operating costs)</li>
        <li><strong>Retail clothing:</strong> 50-100%</li>
        <li><strong>Specialized services:</strong> 40-60%</li>
        <li><strong>Technology products:</strong> 20-40%</li>
      </ul>

      <h4>Factors to Consider:</h4>
      <ul>
        <li><strong>Competition:</strong> High competition = lower margins</li>
        <li><strong>Value perception:</strong> Unique products can command higher margins</li>
        <li><strong>Sales volume:</strong> High volume allows lower margins</li>
        <li><strong>Operating costs:</strong> High costs require higher margins</li>
      </ul>

      <div class="tip">
        <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Strategy:</strong> Start with a 30% margin and adjust based on market response. If you sell a lot, you can lower it. If it's hard to sell, check if your costs are too high.
      </div>
    `
  },
  {
    id: '4',
    title: 'Break-Even Point: How Much Do You Need to Sell?',
    category: EducationCategory.BREAK_EVEN,
    difficulty: 'intermediate',
    estimatedTime: 7,
    content: `
      <h3>What is the Break-Even Point?</h3>
      <p>It's the minimum amount you need to sell for your business to <strong>neither lose nor gain money</strong>. All your income equals all your expenses.</p>
      
      <h4>Basic Formula:</h4>
      <code style="display: block; background: #f5f5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        Break-Even Point (units) = Total Fixed Costs / (Selling Price - Variable Cost per Unit)
      </code>

      <h4>Practical Example:</h4>
      <p>A hamburger stand with:</p>
      <ul>
        <li>Fixed costs: $2,000/month (rent, electricity, salaries)</li>
        <li>Variable cost per hamburger: $2.50 (ingredients, packaging)</li>
        <li>Selling price: $5.00</li>
      </ul>

      <code style="display: block; background: #f5f5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        Break-Even = $2,000 / ($5.00 - $2.50) = $2,000 / $2.50 = 800 hamburgers
      </code>

      <p><strong>Interpretation:</strong> You need to sell <strong>800 hamburgers per month</strong> to cover your costs. At 801, you start making money.</p>

      <h4>Why is it Useful?</h4>
      <ul>
        <li><strong>Set realistic goals:</strong> Know if your target is achievable</li>
        <li><strong>Pricing decisions:</strong> See how a price change affects the required volume</li>
        <li><strong>Cost control:</strong> If break-even is too high, you need to reduce costs</li>
        <li><strong>Investment planning:</strong> Know when you'll start earning</li>
      </ul>

      <h4>What if You're Not Reaching Break-Even?</h4>
      <ol>
        <li><strong>Reduce fixed costs:</strong> Find a cheaper location, automate tasks</li>
        <li><strong>Reduce variable costs:</strong> Better suppliers, optimize portions</li>
        <li><strong>Increase price:</strong> If the market allows it</li>
        <li><strong>Increase sales volume:</strong> Marketing, promotions, new channels</li>
        <li><strong>Add profitable products:</strong> Diversify your offering</li>
      </ol>

      <div class="tip">
        <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Important:</strong> Calculate your break-even point regularly. Every time you change costs or prices, it changes.
      </div>
    `
  },
  {
    id: '5',
    title: 'Direct vs. Indirect Costs',
    category: EducationCategory.PRICING,
    difficulty: 'beginner',
    estimatedTime: 5,
    content: `
      <h3>The Difference Between Direct and Indirect Costs</h3>
      
      <h4>Direct Costs</h4>
      <p>Costs that you can <strong>directly associate with each product</strong>. If you don't make the product, you don't incur this cost.</p>
      <ul>
        <li><strong>Raw materials:</strong> Flour for bread, fabric for clothing</li>
        <li><strong>Packaging:</strong> Bags, boxes, labels</li>
        <li><strong>Direct labor:</strong> Workers who make the product (paid per unit or per product)</li>
        <li><strong>Specific ingredients:</strong> Special supplies for that product</li>
      </ul>

      <h4>Indirect Costs (Fixed Costs)</h4>
      <p>Costs necessary to operate the business, but <strong>not directly tied to a specific product</strong>. They exist whether you produce or not.</p>
      <ul>
        <li><strong>Rent:</strong> Production or commercial space</li>
        <li><strong>Administrative salaries:</strong> Manager, accountant, receptionist</li>
        <li><strong>Utilities:</strong> General electricity, water</li>
        <li><strong>Marketing:</strong> Advertising for the entire business</li>
      </ul>

      <h4>Why is the Distinction Important?</h4>
      <p><strong>Direct costs</strong> are calculated per unit and multiplied by the quantity you produce.</p>
      <p><strong>Indirect costs</strong> are total and monthly, distributed among all your products.</p>

      <h4>Practical Example - Churros Stand:</h4>
      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 0.5rem; text-align: left; border: 1px solid #ddd;">Concept</th>
            <th style="padding: 0.5rem; text-align: center; border: 1px solid #ddd;">Type</th>
            <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Flour, oil, sugar (per churro)</td>
            <td style="padding: 0.5rem; text-align: center; border: 1px solid #ddd;"><span class="badge">Direct</span></td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$0.50</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Packaging (per order)</td>
            <td style="padding: 0.5rem; text-align: center; border: 1px solid #ddd;"><span class="badge">Direct</span></td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$0.30</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Stand rent (monthly)</td>
            <td style="padding: 0.5rem; text-align: center; border: 1px solid #ddd;"><span class="badge">Indirect</span></td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$800</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Fryer (monthly)</td>
            <td style="padding: 0.5rem; text-align: center; border: 1px solid #ddd;"><span class="badge">Indirect</span></td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$200</td>
          </tr>
        </tbody>
      </table>

      <p><strong>Total direct cost per churro:</strong> $0.80</p>
      <p><strong>Total monthly indirect costs:</strong> $1,000</p>
      <p>If you sell 2,000 churros/month: Indirect cost per churro = $1,000 / 2,000 = $0.50</p>
      <p><strong>Total cost per churro:</strong> $0.80 + $0.50 = $1.30</p>

      <div class="tip">
        <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Remember:</strong> Your selling price must always cover BOTH direct and indirect costs, plus your desired profit margin.
      </div>
    `
  },
  {
    id: '6',
    title: 'Price Sensitivity: When Can You Raise Prices?',
    category: EducationCategory.PRICING,
    difficulty: 'advanced',
    estimatedTime: 10,
    content: `
      <h3>Understanding Price Sensitivity</h3>
      <p>Price sensitivity (price elasticity) measures how much your sales change when you modify your price. It's key to making smart pricing decisions.</p>
      
      <h4>Types of Products by Sensitivity:</h4>
      
      <h5>1. High Sensitivity (Elastic)</h5>
      <p>Small price changes cause large sales changes. Customers easily switch to competitors.</p>
      <ul>
        <li><strong>Examples:</strong> Basic groceries, generic clothing, commodity products</li>
        <li><strong>Strategy:</strong> Keep competitive prices, focus on volume</li>
        <li><strong>Margin:</strong> Low (10-25%)</li>
      </ul>

      <h5>2. Low Sensitivity (Inelastic)</h5>
      <p>Customers buy even if prices rise. There are no easy alternatives or they're necessities.</p>
      <ul>
        <li><strong>Examples:</strong> Medicines, luxury items, specialized services</li>
        <li><strong>Strategy:</strong> You can charge higher prices</li>
        <li><strong>Margin:</strong> High (40-100%+)</li>
      </ul>

      <h4>When CAN You Raise Prices?</h4>
      <ul>
        <li><strong>You have loyal customers:</strong> They value your product over others</li>
        <li><strong>Little competition:</strong> Few similar alternatives</li>
        <li><strong>Superior quality:</strong> Your product is objectively better</li>
        <li><strong>Convenience:</strong> Location, quick service, delivery</li>
        <li><strong>Strong brand:</strong> Recognized and trusted</li>
        <li><strong>Necessity:</strong> Customers NEED your product</li>
      </ul>

      <h4>When SHOULDN'T You Raise Prices?</h4>
      <ul>
        <li><strong>Many competitors:</strong> Customers can easily go elsewhere</li>
        <li><strong>Commodity product:</strong> All products are essentially the same</li>
        <li><strong>Price-conscious market:</strong> Your customers always look for the lowest price</li>
        <li><strong>Economic recession:</strong> People are cutting spending</li>
        <li><strong>Starting out:</strong> Building customer base is more important</li>
      </ul>

      <h4>How to Test Pricing?</h4>
      <ol>
        <li><strong>A/B Testing:</strong> Try different prices on different days</li>
        <li><strong>Small increases:</strong> 5-10% every few months</li>
        <li><strong>Product tiers:</strong> Basic, standard, premium</li>
        <li><strong>Bundles:</strong> Combined products at better price</li>
        <li><strong>Survey customers:</strong> "What would you pay for this?"</li>
      </ol>

      <h4>Practical Example:</h4>
      <p>A coffee shop with premium specialty coffee:</p>
      <ul>
        <li>Current price: $3.00</li>
        <li>Current sales: 200 coffees/day</li>
        <li>Cost per coffee: $1.20</li>
      </ul>

      <p><strong>Scenario 1: Raise to $3.30</strong> (10% increase)</p>
      <ul>
        <li>Sales drop to 180 coffees/day (10% decrease)</li>
        <li>Revenue before: $600/day ($3.00 × 200)</li>
        <li>Revenue after: $594/day ($3.30 × 180)</li>
        <li><strong>Result:</strong> Not worth it</li>
      </ul>

      <p><strong>Scenario 2: Raise to $3.20</strong> (6.7% increase)</p>
      <ul>
        <li>Sales drop to 190 coffees/day (5% decrease)</li>
        <li>Revenue before: $600/day</li>
        <li>Revenue after: $608/day ($3.20 × 190)</li>
        <li><strong>Result:</strong> Good balance!</li>
      </ul>

      <div class="tip">
        <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Key:</strong> Never raise prices without a reason you can communicate to customers: "better quality," "premium service," "higher operating costs." Transparency builds trust.
      </div>
    `
  },
  {
    id: '7',
    title: 'Assets & Investments: How to Recover Your Money',
    category: EducationCategory.ASSETS,
    difficulty: 'beginner',
    estimatedTime: 7,
    content: `
      <h3>What Are Assets?</h3>
      <p>Assets are <strong>one-time investments</strong> you make in equipment, machinery, tools, or vehicles to operate your business. Unlike monthly expenses, you pay for them once, but they last for years.</p>
      
      <h4>Examples of Business Assets:</h4>
      <ul>
        <li><strong>Machinery:</strong> Industrial oven, mixer, production machines</li>
        <li><strong>Equipment:</strong> Computers, printers, specialized tools</li>
        <li><strong>Tools:</strong> Work tools, kitchen equipment</li>
        <li><strong>Furniture:</strong> Tables, chairs, shelving</li>
        <li><strong>Vehicles:</strong> Delivery trucks, company cars</li>
      </ul>

      <h3>Estimated Duration (Depreciation)</h3>
      <p>Since assets last several years, you shouldn't charge their full cost to just one month. Instead, you <strong>distribute the cost over time</strong> according to how long you expect to use them.</p>

      <h4>Typical Durations by Asset Type:</h4>
      <ul>
        <li><strong>Technology (computers, phones):</strong> 24-36 months (2-3 years)</li>
        <li><strong>Machinery and equipment:</strong> 36-60 months (3-5 years)</li>
        <li><strong>Tools:</strong> 12-36 months (1-3 years)</li>
        <li><strong>Furniture:</strong> 48-120 months (4-10 years)</li>
        <li><strong>Vehicles:</strong> 60-120 months (5-10 years)</li>
      </ul>

      <h3>How to Calculate Monthly Depreciation</h3>
      <code style="display: block; background: #f5f5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        Monthly Depreciation = Purchase Value / Estimated Duration (in months)
      </code>

      <h4>Practical Example - Bakery:</h4>
      <p>You buy an <strong>industrial mixer for $6,000</strong>. You expect it to last <strong>36 months (3 years)</strong>.</p>
      <code style="display: block; background: #f5f5f5; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
        Monthly Depreciation = $6,000 / 36 months = $166.67/month
      </code>

      <p>This means that each month, you add <strong>$166.67 to your costs</strong> to account for the mixer. It's like the mixer "costs" you that amount monthly, even though you paid for it all at once.</p>

      <h3>Impact on Your Prices</h3>
      <p>Asset depreciation is added to your monthly fixed costs. It gets distributed among all your products just like rent or utilities.</p>

      <h4>Example with numbers:</h4>
      <ul>
        <li>Monthly fixed costs: $2,000</li>
        <li>Asset depreciation: $166.67</li>
        <li><strong>Total monthly costs: $2,166.67</strong></li>
      </ul>

      <p>If you sell 1,000 loaves of bread per month:</p>
      <ul>
        <li>Without depreciation: $2.00 fixed cost per loaf</li>
        <li>With depreciation: $2.17 fixed cost per loaf</li>
        <li><strong>Difference: $0.17 more per loaf</strong></li>
      </ul>

      <h3>What if It Lasts More or Less?</h3>
      
      <h4>If it lasts LONGER than expected:</h4>
      <p>Great news! After the estimated duration, the asset is "paid off." From that point on, you don't include it in costs, increasing your profit margin.</p>

      <h4>If it breaks SOONER than expected:</h4>
      <p>You'll need to replace it before planned. That's why it's recommended to:</p>
      <ul>
        <li>Be conservative with estimates</li>
        <li>Perform preventive maintenance</li>
        <li>Have a replacement fund</li>
      </ul>

      <h3>Practical Tips</h3>
      <ol>
        <li><strong>Be conservative:</strong> Better to overestimate duration and be pleasantly surprised than the opposite</li>
        <li><strong>Consider usage intensity:</strong> A mixer used 12 hours/day wears out faster than one used 2 hours/day</li>
        <li><strong>Plan maintenance:</strong> Well-maintained assets last longer</li>
        <li><strong>Plan replacement:</strong> Know when you'll need to buy a new asset</li>
      </ol>

      <h3>Complete Example - Coffee Shop:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 0.5rem; text-align: left; border: 1px solid #ddd;">Asset</th>
            <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Purchase Value</th>
            <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Duration (months)</th>
            <th style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">Monthly Depreciation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Espresso machine</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$60,000</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">60</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$1,000</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Grinder</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$15,000</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">48</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$312.50</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #ddd;">Refrigerator</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$8,000</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">72</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">$111.11</td>
          </tr>
          <tr style="background: #f0f8ff;">
            <td style="padding: 0.5rem; border: 1px solid #ddd;"><strong>TOTAL</strong></td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;"><strong>$83,000</strong></td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;">-</td>
            <td style="padding: 0.5rem; text-align: right; border: 1px solid #ddd;"><strong>$1,423.61/month</strong></td>
          </tr>
        </tbody>
      </table>

      <p>This coffee shop needs to include <strong>$1,423.61 per month</strong> in its fixed costs to gradually recover its equipment investment.</p>

      <div class="tip">
        <strong><span class="material-icons icon-tip" style="font-size: 18px; vertical-align: middle;">lightbulb</span> Final Tip:</strong> This app automates all these calculations for you. Just enter your assets, their purchase value, and estimated duration, and the system will automatically include depreciation in your pricing calculations.
      </div>
    `
  }
];
