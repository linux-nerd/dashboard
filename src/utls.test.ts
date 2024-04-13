import { generateFilterOptions, filterData, FilterOptions, Order, Session, Filter } from "./utils";

describe("generateFilterOptions", () => {
  const orders: Order[] = [
    { channel: "Channel 1", channelGroup: "Group A", campaignName: "Campaign X", orderValue: 100 },
    { channel: "Channel 2", channelGroup: "Group B", campaignName: "Campaign Y", orderValue: 200 },
  ];
  const sessions: Session[] = [
    { channel: "Channel 1", channelGroup: "Group A", campaignName: "Campaign X" },
    { channel: "Channel 3", channelGroup: "Group C", campaignName: "Campaign Z" },
  ];

  it("should generate filter options correctly", () => {
    const expectedOptions: FilterOptions = {
      channelOptions: [
        { value: "Channel 1", label: "Channel 1" },
        { value: "Channel 2", label: "Channel 2" },
        { value: "Channel 3", label: "Channel 3" },
      ],
      channelGroupOptions: [
        { value: "Group A", label: "Group A" },
        { value: "Group B", label: "Group B" },
        { value: "Group C", label: "Group C" },
      ],
      campaignOptions: [
        { value: "Campaign X", label: "Campaign X" },
        { value: "Campaign Y", label: "Campaign Y" },
        { value: "Campaign Z", label: "Campaign Z" },
      ],
    };

    const options = generateFilterOptions(orders, sessions);
    expect(options).toEqual(expectedOptions);
  });
});

describe("filterData", () => {
  const testData: { channel: string; channelGroup: string; campaignName: string }[] = [
    { channel: "Channel 1", channelGroup: "Group A", campaignName: "Campaign X" },
    { channel: "Channel 2", channelGroup: "Group B", campaignName: "Campaign Y" },
    { channel: "Channel 3", channelGroup: "Group A", campaignName: "Campaign Z" },
  ];

  it("should filter data correctly", () => {
    const filter: Filter = {
      channel: ["Channel 1", "Channel 2"],
      channelGroup: ["Group A"],
      campaign: [],
    };

    const expectedFilteredData = [
      { channel: "Channel 1", channelGroup: "Group A", campaignName: "Campaign X" },
    ];

    const filteredData = filterData(testData, filter);
    expect(filteredData).toEqual(expectedFilteredData);
  });
});