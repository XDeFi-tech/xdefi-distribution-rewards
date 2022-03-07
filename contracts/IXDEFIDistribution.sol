interface IXDEFIDistribution {
    /// @notice To be called as part of distributions to force the contract to recognize recently transferred XDEFI as distributable.
    function updateDistribution() external;
}
