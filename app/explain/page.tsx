import React from "react";

const Explain = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        How to Use SplitDa Receipt: Simplify Expense Splitting with Ease
      </h1>

      <p className="text-lg mb-4">
        SplitDa Receipt is a user-friendly web application designed to
        streamline the process of splitting expenses among groups of people.
        Whether you’re splitting restaurant bills, grocery costs, or any other
        shared expenses, SplitDa Receipt helps you manage and track everything
        effortlessly. Let’s dive into how you can use this app effectively.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Getting Started</h2>

      <h3 className="text-xl font-bold mb-2">
        Step 1: Enter Participant Names
      </h3>

      <p className="mb-4">
        Start by entering the names of all participants involved in the expense.
        You can do this by typing each name separated by commas in the input
        field provided. For example, enter “Adam, Bob, Wei Jie” if these are the
        people sharing the expense.
      </p>

      <h3 className="text-xl font-bold mb-2">
        Step 2: Confirm Participant Names. Once confirmed is pressed, you cannot
        edit the names again!
      </h3>

      <p className="mb-4">
        Once you’ve entered the names, click the “Confirm” button. This action
        locks in the participant names and moves you to the next step. Once
        confirmed, you won’t be able to edit the names again to ensure accuracy
        in expense tracking.
      </p>

      <h3 className="text-xl font-bold mb-2">Step 3: Upload Receipt</h3>

      <p className="mb-4">
        After confirming the participants, you can upload a receipt from your
        recent purchase. Simply click on the “Upload Receipt” button and select
        the image file containing your receipt. SplitDa Receipt will process the
        receipt to extract all the necessary details.
      </p>

      <h3 className="text-xl font-bold mb-2">
        Step 4: Review and Split Expenses
      </h3>

      <p className="mb-4">
        Once the receipt is uploaded, SplitDa Receipt will display a breakdown
        of all items purchased, including their prices and quantities. Each
        participant can then select which items they were involved in purchasing
        by using checkboxes next to each item.
      </p>

      <h3 className="text-xl font-bold mb-2">Step 5: Review and Finalize</h3>

      <p className="mb-4">
        Review the selected items and their corresponding prices to ensure
        accuracy. Once everything looks good, finalize the expense splitting.
        SplitDa Receipt will calculate and display each person total
        contribution based on their selected items.
      </p>

      <h3 className="text-xl font-bold mb-2">
        Step 6: Summary and Confirmation
      </h3>

      <p className="mb-4">
        After finalizing, SplitDa Receipt will provide a summary of each
        participant’s total contribution. You can review this summary to ensure
        fairness in expense distribution. Once confirmed, you can save or share
        this summary for future reference.
      </p>
    </div>
  );
};

export default Explain;
